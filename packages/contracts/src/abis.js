import erc20Abi from "./abis/erc20.json";
import ownableAbi from "./abis/ownable.json";
import OMGToken from "./abis/OMGToken.json";
import WOMG from "./abis/WOMG.json";

const abis = {
  erc20: erc20Abi,
  ownable: ownableAbi,
  OMGToken: OMGToken.abi,
  WOMG: WOMG.abi,
};

export default abis;
