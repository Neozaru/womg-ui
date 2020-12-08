// This address points to a dummy ERC20 contract deployed on Ethereum Mainnet,
// Goerli, Kovan, Rinkeby and Ropsten. Replace it with your smart contracts.
const addresses = {
  '1': { // Mainnet
    'OMG': '0xd26114cd6ee289accf82350c8d8487fedb8a0c07',
    'WOMG': '0x90edce4349cf741bb22469efcccda5a54e004d11',
  },
  '42': { // Kovan
    'OMG': '0x24802a820be79310822e7b55a4bd9c87fa982213', // Homemade test OMG token (not offical Kovan OMG Token) 
    'WOMG': '0xf92df695bc153Fdb7075291E9d83e957a93996AB'
  }
}
export default addresses;
