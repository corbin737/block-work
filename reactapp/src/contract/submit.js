import { bytecode, abi } from './BlockWorkContract.json';
import { web3 } from './web3Util.js';

const BlockWorkContract = new web3.eth.Contract(abi);

const submit = (value, blockWorkContractAddress, contractorAddress, work) => {
  BlockWorkContract.options.address = blockWorkContractAddress;

  const submitParameters = {
      arguments: [work],
      data: bytecode,
  }

  return BlockWorkContract.methods['submit'](work).send({
    from: contractorAddress,
    value
  })
}

export default submit;
