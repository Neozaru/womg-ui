import React, { useState } from "react";

import {
  BrowserRouter,
  Switch,
  Route,
  Link as RouterLink,
} from "react-router-dom";
import { Contract } from "@ethersproject/contracts";

import styled from "styled-components";

import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import { Swap } from "./components/Swap";
import { Info } from "./components/Info";

import * as web3ModalConfig from "./web3ModalConfig.json";

const config = {
  tokens: {
    'OMG': {
      abi: abis.OMGToken,
    },
    'WOMG': {
      abi: abis.WOMG
    }
  }
}

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
      primary={!!provider}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

function isNetworkSupported(network) {
  return !!addresses[network.chainId];
}

function getTokenAddress(symbol, network) {
  return addresses[network.chainId][symbol];
}

function initToken(symbol, network, provider) {
  return {
    symbol,
    contract: new Contract(getTokenAddress(symbol, network), config.tokens[symbol].abi, provider)
  }
}

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal(web3ModalConfig);

  const [baseToken, setBaseToken] = useState();
  const [wrapperToken, setWrapperToken] = useState();

  const [network, setNetwork] = useState();
  const [account, setAccount] = useState();


  React.useEffect(() => {
    if (!provider) {
      console.log('No provider')
      return;
    }

    console.log('Provider detected', provider);

    provider.getNetwork().then(setNetwork);
    onNewSigner(provider.getSigner());

    provider.provider.on('accountsChanged', () => { // Metamask only
      const signer = provider.getSigner(); 
      console.log('Signer changed', signer);
      onNewSigner(signer);
    });

    provider.provider.on('chainChanged', (newNetwork, oldNetwork) => { // Metamask only
      console.log('Network change. Reloading', newNetwork, oldNetwork)
        window.location.reload();
    });

  }, [provider]);

  React.useEffect(() => {
    if (!network) {
      console.log('Network not initialized.');
      return;
    }

    console.log('Network initialized', network);
    if (!isNetworkSupported(network)) {
      console.log('Unsupported network', network)
      return;
    }
    setBaseToken(initToken('OMG', network, provider));
    setWrapperToken(initToken('WOMG', network, provider));
  }, [network, provider]);

  function onNewSigner(signer) {
    signer.getAddress().then(accountAddress => {
      setAccount({
        address: accountAddress,
        signer,
      });
    });
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/info">
          <Header>
            <RouterLink to="/">
              <Button>APP</Button>
            </RouterLink>
          </Header>
          <Body>
            <Info/>
          </Body>
        </Route>
        <Route path="/">
          <Header>
            <RouterLink to="/info">
              <Button>INFO</Button>
            </RouterLink>
              <HeaderRight>
                {network && 
                  <>
                    <NetworkName>{`[${network.name}]`}</NetworkName> 
                    {account.address}
                  </>
                }
                <WalletButton provider={provider} loadWeb3Modal={loadWeb3Modal} logoutOfWeb3Modal={logoutOfWeb3Modal} />
              </HeaderRight>
            
          </Header>
          <Body>
            {network
              ? isNetworkSupported(network) 
                  ? baseToken && wrapperToken 
                    ? <Swap baseToken={baseToken} wrapperToken={wrapperToken} account={account}></Swap>
                    : <div>Loading...</div>
                  : <div>Unsupported network ({network.name}). Please switch to Kovan or Mainnet</div>
              : <></>
            }
          </Body>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}



export const Header = styled.header`
  background-color: #35353f;
  min-height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  color: white;
  font-family: "MessinaMono",monospace;
  display: flex;
  justify-content: space-between;
`;

const Body = styled.div`
  align-items: center;
  background-color: rgb(16, 16, 16);
  color: white;
  display: flex;
  flex-direction: column;
  font-size: 21px;
  min-height: calc(100vh - 70px);
  font-family: "MessinaMono",monospace;
`;

const NetworkName = styled.span`
  text-transform: uppercase;
  margin-right: 5px;
`;
  
const HeaderRight = styled.span`
  display: flex;
  align-items: center;
  flex-direction: row;
`

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #35353f;
  text-transform: uppercase;
  border: 2px solid #585868;
  font-size: 14px;
  color: #fff;
  transition: all .2s ease-in-out;
  cursor: pointer;
  text-align: center;
  margin: 0px 20px;
  padding: 15px;
  outline: none;

  ${props => props.hidden && "hidden"} :focus {
    border: 2px solid white;
    outline: none;
  }
`;

export default App;
