import { bytecode, abi } from './BlockWorkContract.json';
import { web3 } from './web3Util.js';

const BlockWorkContract = new web3.eth.Contract(abi);

const arbiterApprove = (blockWorkContractAddress, arbiterAddress) => {
  BlockWorkContract.options.address = blockWorkContractAddress;

  return BlockWorkContract.methods['arbiterApprove']().send({
    from: arbiterAddress
  })
}

export default arbiterApprove;
