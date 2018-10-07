import { bytecode, abi } from './BlockWorkContract.json';
import { web3 } from './web3Util.js';

const BlockWorkContract = new web3.eth.Contract(abi);

const deploy = (value, requesterAddress, contractorAddress, arbiterAddress, agreement, arbitrationFee) => {
    const deployParameters = {
        arguments: [contractorAddress, arbiterAddress, agreement, arbitrationFee],
        data: bytecode,
    }
    return BlockWorkContract.deploy(deployParameters).estimateGas().then((gas) => {
        return BlockWorkContract.deploy(deployParameters).send({
            from: requesterAddress,
            value,
            gas: 5000000
        });
    })
}

export default deploy;
