import { bytecode, abi } from './BlockWorkContract.json';
import { web3 } from './web3Util.js';

const BlockWorkContract = new web3.eth.Contract(abi);

const submit = (blockWorkContractAddress, contractorAddress, work) => {
  BlockWorkContract.options.address = blockWorkContractAddress;

  const submitParameters = {
      arguments: [work],
      data: bytecode,
  }

  return BlockWorkContract.methods['submit'](submitParameters).send({
    from: contractorAddress
  })
}

export default submit;
