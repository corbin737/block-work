import { bytecode, abi } from './BlockWorkContract.json';
import { web3 } from './web3Util.js';

const BlockWorkContract = new web3.eth.Contract(abi);

const arbiterReject = (blockWorkContractAddress, arbiterAddress) => {
  BlockWorkContract.options.address = blockWorkContractAddress;

  return BlockWorkContract.methods['arbiterReject']().send({
    from: arbiterAddress
  })
}

export default arbiterReject;
