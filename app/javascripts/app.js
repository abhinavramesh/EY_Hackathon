// Import the page's CSS. Webpack will know what to do with it.
import "../../app/stylesheets/app.css";

// Import libraries we need.
import { default as Web3 } from 'web3';
import { default as contract } from 'truffle-contract'

import ServiceProvider_artifacts from '../../build/contracts/ServiceProvider.json'
import CustomerCoin_artifacts from '../../build/contracts/CustomerCoin.json'

var ServiceProvider = contract(ServiceProvider_artifacts);
var CustomerCoin = contract(CustomerCoin_artifacts);

var accounts;
var ABC001;
var ABC016;
var ABC006;
var ABC011;
var ABC012;
var ABC002;
var ABC009;
var ABC008;
var ABC017;
var ABC007;
var ABC005;
var ABC015;
var ABC014;
var ABC020;
var ABC019;
var ABC013;
var ABC018;
var ABC004;
var ABC010;
var ABC003;

window.App = {
    start: function() {
        var self = this;

        ServiceProvider.setProvider(web3.currentProvider);
        // CustomerCoin.setProvider(web3.currentProvider);

        // Get the initial account balance so it can be displayed.
        web3.eth.getAccounts(function(err, accs) {
            if (err != null) {
                alert("There was an error fetching your accounts.");
                return;
            }

            if (accs.length == 0) {
                alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
                return;
            }

            accounts = accs;

            ABC001 = accounts[0];
            ABC002 = accounts[1];
            ABC003 = accounts[2];
            ABC004 = accounts[3];
            ABC005 = accounts[4];
            ABC006 = accounts[5];
            ABC007 = accounts[6];
            ABC008 = accounts[7];
            ABC009 = accounts[8];
            ABC010 = accounts[9];
            ABC011 = accounts[10];
            ABC012 = accounts[11];
            ABC013 = accounts[12];
            ABC014 = accounts[13];
            ABC015 = accounts[14];
            ABC016 = accounts[15];
            ABC017 = accounts[16];
            ABC018 = accounts[17];
            ABC019 = accounts[18];
            ABC020 = accounts[19];

            self.refreshProviderCoin();
            // self.refreshCustomerCoin();
        });
    },

    setStatus: function(message) {
        var status = document.getElementById("status");
        status.innerHTML = message;
    },

    refreshProviderCoin: function() {
        var self = this;

        var ServiceCoin;
        ServiceProvider.deployed().then(function(instance) {
            ServiceCoin = instance;
            return ServiceCoin.getBalance.call(ABC001, { from: accounts });
        }).then(function(value) {
            var balance_element = document.getElementById("balanceOf");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error getting balance; see log.");
        });
    },

    // refreshCustomerCoin: function() {
    //     var self = this;

    //     var Customer;
    //     CustomerCoin.deployed().then(function(instance) {
    //         Customer = instance;
    //         return Customer.getData.call(ABC001, { from: accounts });
    //     }).then(function(value) {
    //         var balance_element = document.getElementById("balanceOf");
    //         balance_element.innerHTML = value.valueOf();
    //     }).catch(function(e) {
    //         console.log(e);
    //         // self.setStatus("Error getting balance; see log.");
    //     });
    // },
    sendBandwidth: function() {
        var self = this;

        var _value = parseInt(document.getElementById("bandWidth").value);
        var _to = document.getElementById("customenName").value;

        // this.setStatus("Initiating transaction... (please wait)");

        var meta;
        ServiceProvider.deployed().then(function(instance) {
            meta = instance;
            return meta.transfer(_to, _value, { from: ABC001 });
        }).then(function() {
            // self.setStatus("Transaction complete!");
            self.refreshProviderCoin();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error sending coin; see log.");
        });
    },
    sendRequest: function() {
        var self = this;

        var _to = parseInt(document.getElementById("customenName").value);
        var _value = document.getElementById("bandWidth").value;

        // this.setStatus("Initiating transaction... (please wait)");

        var meta;
        CustomerCoin.deployed().then(function(instance) {
            meta = instance;
            return meta.transfer(_to, _value, { from: ABC001 });
        }).then(function() {
            // self.setStatus("Transaction complete!");
            // self.refreshProviderCoin();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error sending coin; see log.");
        });
    },
    checkBalance: function() {
        var self = this;
        var rapid;
        ServiceProvider.deployed().then(function(instance) {
            rapid = instance;
            var coinAddress = document.getElementById("coinReceiver").value;
            console.log("Coin Address: " + ABC001);
            return rapid.getBalance.call(coinAddress, {
                from: ABC001
            });
        }).then(function(value) {
            var balance_element = document.getElementById("checkBalance");
            balance_element.innerHTML = value.valueOf();
        }).catch(function(e) {
            console.log(e);
            // self.setStatus("Error getting balance; see log.");
        });
    },
};

window.addEventListener('load', function() {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        console.warn("Using web3 detected from external source. If you find that your accounts don't appear or you have 0 MetaCoin, ensure you've configured that source properly. If using MetaMask, see the following link. Feel free to delete this warning. :) http://truffleframework.com/tutorials/truffle-and-metamask")
            // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:8545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for development. More info here: http://truffleframework.com/tutorials/truffle-and-metamask");
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }

    App.start();
});