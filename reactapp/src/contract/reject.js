import { bytecode, abi } from './BlockWorkContract.json';
import { web3 } from './web3Util.js';

const BlockWorkContract = new web3.eth.Contract(abi);

const reject = (blockWorkContractAddress, requesterAddress) => {
  BlockWorkContract.options.address = blockWorkContractAddress;

  return BlockWorkContract.methods['reject']().send({
    from: requesterAddress
  })
}

export default reject;
