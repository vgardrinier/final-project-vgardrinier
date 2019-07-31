var EnergyTrading = artifacts.require("./EnergyTrading.sol");

module.exports = function(deployer) {
  deployer.deploy(EnergyTrading);
};
