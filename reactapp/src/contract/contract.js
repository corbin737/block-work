import { bytecode, abi } from './BlockWorkContract.json';
import { web3 } from './web3Util.js';

export default address => window.web3.eth.contract(abi).at(address)
