const BlockWork = artifacts.require('BlockWork');

module.exports = function(deployer) {
  deployer.deploy(BlockWork);
};
