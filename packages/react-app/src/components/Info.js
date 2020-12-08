import React from "react";
import styled from "styled-components";

export const Info = function() {

  return (
    <Container>
      <h2>Wrapped OMG Token</h2>
      <div>
        WOMG allows you to wrap your OMG in an ERC20-compliant token so you can use them safely in DeFi apps.
      </div>
      <div>
        More info about OMG Token ERC20 compliance issues can be read <Link target="blank" href="https://medium.com/coinmonks/missing-return-value-bug-at-least-130-tokens-affected-d67bf08521ca">here</Link>.
      </div>
      <h3>How do I get WOMG ?</h3>
      <div>
        Simply wrap your OMG for an equal amount of WOMG.
      </div>
      <div>
        All WOMG are redeemable for an equal amount of OMG.
      </div>
      <div>
        1 OMG = 1 WOMG, simply, and forever.
      </div>
      <h3>What can I do with WOMG ?</h3>
      <div>
        - Provide WOMG Liquidity in a Balancer Pool.
      </div>
      <div>
        - Use WOMG as collateral in supported dApps.
      </div>
      <div>
        - Transfer WOMG between accounts.
      </div>
      <h3>LINKS</h3>
      <div>UI code and issues : <Link href="https://github.com/Neozaru/womg-ui">github.com/Neozaru/womg-ui</Link></div>
      <div>Contracts code and issues : <Link href="https://github.com/Neozaru/BadERC20-Wrappers">github.com/Neozaru/BadERC20-Wrappers</Link></div>
      <h3>DISCLAIMERS</h3>
      <div>
        DO NOT try to send WOMG to an exchange that does not explicity supports WOMG. Although all WOMG are redeemable for their underlying OMG Network Token, exchanges might not be able to recover funds.
      </div>
      <div>
        WOMG is NOT developed, supported or endorsed by OMG Network or any team related to Omise.
      </div>
      <div>
        WOMG interface and contracts are provided as is, without any guarantee of being bug-free.
      </div>
      <h3>CREDITS</h3>
      <div>UI created using <b>create-eth-app</b> : <Link href="https://github.com/paulrberg/create-eth-app">github.com/paulrberg/create-eth-app</Link></div>
      <div>Contract Code sourced from @adamaid_321's Reddit <Link href="https://www.reddit.com/r/ethtrader/comments/awooqz/womg_added_to_uniswap/">post</Link> and <Link href="https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code">WETH9</Link></div>
      <h3>CONTRACTS</h3>
      <h4>Homestead (Mainnet)</h4>
      <div>OMG (official by OMG Network team) : <Link href="https://etherscan.io/address/0xd26114cd6EE289AccF82350c8d8487fedB8A0C07">0xd26114cd6EE289AccF82350c8d8487fedB8A0C07</Link></div>
      <div>WOMG : <Link href="https://etherscan.io/address/0x90edce4349cf741bb22469efcccda5a54e004d11">0x90edce4349cf741bb22469efcccda5a54e004d11</Link></div>
      <h4>Kovan (Testnet)</h4>
      <div>OMG (unofficial for WOMG testing purpose) : <Link href="https://kovan.etherscan.io/address/0x24802a820be79310822e7b55a4bd9c87fa982213">0x24802a820be79310822e7b55a4bd9c87fa982213</Link></div>
      <div>WOMG : <Link href="https://kovan.etherscan.io/address/0xf92df695bc153Fdb7075291E9d83e957a93996AB">0xf92df695bc153Fdb7075291E9d83e957a93996AB</Link></div>
    </Container>
  )
}


const Container = styled.div`{
  background-color: rgb(42, 41, 46);
  width: 800px;
  padding: 15px;
  margin-top: 15px;
  font-weight: 100;
  font-size: 14px;
}`

const Link = styled.a.attrs({
  target: "_blank",
  rel: "noopener noreferrer",
})`
  color: #61dafb;
  margin-top: 10px;
`;