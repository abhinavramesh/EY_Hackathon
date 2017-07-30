var ServiceProvider = artifacts.require("./ServiceProvider.sol");
var CustomerCoin = artifacts.require("./CustomerCoin.sol");
module.exports = function(deployer) {
    deployer.deploy(CustomerCoin);
    deployer.deploy(ServiceProvider);
};