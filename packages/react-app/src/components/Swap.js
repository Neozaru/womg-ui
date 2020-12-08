
import React, { useEffect, useCallback, useState } from "react";
import { formatEther, parseEther } from "ethers/lib/utils";
import { BigNumber } from "ethers";
import { SwapInput } from "./SwapInput";
import styled from "styled-components";


const formattedBalanceOf = (token, ownerAddress) => {
  return token.contract.balanceOf(ownerAddress).then(balance => {
    return formatEther(balance)
  });
};

const floatAllowance = (token, ownerAddress, spenderAddress) => {
  return token.contract.allowance(ownerAddress, spenderAddress).then(allowance => {
    return parseFloat(formatEther(allowance));
  });
}

const WRAP = 'wrap';
const UNWRAP = 'unwrap';

const ZERO_ALLOWANCE = BigNumber.from(0);
const MAX_ALLOWANCE = BigNumber.from(2).pow(256).sub(1);

export const Swap = function({baseToken, wrapperToken, account}) {

  const [balances, setBalances] = useState({
    baseToken: 0,
    wrapperToken: 0,
  });

  const [wrapperAllowance, setWrapperAllowance] = useState(0);

  const [mode, setMode] = useState(WRAP);

  const [stringAmount, setStringAmount] = useState('');
  const [amount, setAmount] = useState(0);

  const refreshBalances = useCallback(
    () => {
      Promise.all([
        formattedBalanceOf(baseToken, account.address),
        formattedBalanceOf(wrapperToken, account.address)
      ]).then(([baseTokenBalance, wrapperTokenBalance]) => {
        setBalances({
          baseToken: baseTokenBalance,
          wrapperToken: wrapperTokenBalance,
        })
      });
    },
    [baseToken, wrapperToken, account],
  );

  const refreshAllowance = useCallback(
    () => {
      floatAllowance(baseToken, account.address, wrapperToken.contract.address).then(setWrapperAllowance);
    },
    [baseToken, wrapperToken, account],
  );

  useEffect(function updateBalancesAndAllowance() {
    refreshBalances();
    refreshAllowance();
  }, [account, refreshBalances, refreshAllowance]);


  function wrap(wrapAmount) {
    const ethAmount = parseEther(`${wrapAmount}`);
    console.log('deposit', wrapAmount, ethAmount);
    const signedWrapperContract = wrapperToken.contract.connect(account.signer);
    signedWrapperContract.deposit(ethAmount).then(wrapUnwrapHandler);
  }

  function unwrap(unwrapAmount) {
    const ethAmount = parseEther(`${unwrapAmount}`);
    console.log('withdraw', unwrapAmount, ethAmount);
    const signedWrapperContract = wrapperToken.contract.connect(account.signer);
    signedWrapperContract.withdraw(ethAmount).then(wrapUnwrapHandler);
  }

  function wrapUnwrapHandler(res) {
    setStringAmount('');  
    setAmount(0);
    res.wait().then(() => {
      refreshBalances();
      refreshAllowance();
    })
  }

  function changeAllowance(allowance) {
    const signedBaseTokenContract = baseToken.contract.connect(account.signer);
    signedBaseTokenContract.approve(wrapperToken.contract.address, allowance).then((res) => {
      res.wait().then(refreshAllowance);
    });
  }

  function toggleMode() {
    setMode(mode === WRAP ? UNWRAP : WRAP);
  }

  function onStringAmountChanged(stringAmount) {
    setStringAmount(stringAmount);
    const newAmount = parseFloat(stringAmount);
    setAmount(Number.isNaN(newAmount) ? 0 : newAmount);
  }

  let button;
  if (amount <= 0) {
    button = <PrimaryButton disabled={true}>Enter an amount</PrimaryButton>;
  } else if ((mode === WRAP && balances.baseToken < amount) || (mode === UNWRAP && balances.wrapperToken < amount)) {
    button = <PrimaryButton disabled={true}>Insufficient {mode === WRAP ? baseToken.symbol : wrapperToken.symbol} balance</PrimaryButton>
  }  else if (mode === WRAP) {
    if (wrapperAllowance >= amount) {
      button = <PrimaryButton onClick={() => wrap(amount)}>WRAP</PrimaryButton>;
    } else if (wrapperAllowance === 0) {
      button = <PrimaryButton onClick={() => changeAllowance(MAX_ALLOWANCE)}>APPROVE</PrimaryButton>;
    } else {
      button = <PrimaryButton onClick={() => changeAllowance(ZERO_ALLOWANCE)}>RESET ALLOWANCE</PrimaryButton>;
    }
  } else { // UNWRAP
    button = <PrimaryButton onClick={() => unwrap(amount)}>UNWRAP</PrimaryButton>;
  }

  const [topToken, bottomToken] = mode === WRAP ? [baseToken, wrapperToken] : [wrapperToken, baseToken];
  const [topTokenBalance, bottomTokenBalance] = mode === WRAP ? [balances.baseToken, balances.wrapperToken] : [balances.wrapperToken, balances.baseToken];

  return (
    <Container>
      <SwapInput 
        title={'Convert'}
        symbol={topToken.symbol}
        balance={topTokenBalance} 
        displayMaxButton={amount !== parseFloat(topTokenBalance)}
        value={stringAmount} 
        onValueChanged={onStringAmountChanged}/>
      <Arrow onClick={() => toggleMode()}>↓</Arrow>
      <SwapInput 
        title={'To'}
        symbol={bottomToken.symbol} 
        balance={bottomTokenBalance} 
        value={stringAmount} 
        onValueChanged={onStringAmountChanged}/>
      {button}
    </Container>
  )
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 10px;
  margin: 50px;
  padding: 20px;
  background-color: rgb(42, 41, 46);
  width: 420px;
  height: 300px;
`;

const PrimaryButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  padding: 18px;
  margin-top: 20px;
  cursor: pointer;
  color: white;
  background-color: #4967ff;
  font-family: "MessinaMono",monospace;
  outline: none;
  border: 1px solid transparent;
  text-decoration: none;
  &:disabled {
    filter: brightness(50%);
    cursor: default;
  }
`;

const Arrow = styled.div`
  font-size: 32px;
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
  cursor: pointer;
  user-select: none;
`;
