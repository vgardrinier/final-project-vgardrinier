App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load pets.
    $.getJSON('../collectives.json', function(data) {
      var collectiveRow = $('#collectiveRow');
      var Template = $('#Template');

      for (i = 0; i < 4; i ++) {
        Template.find('.panel-title').text(data[i].name);
        Template.find('img').attr('src', data[i].picture);
        Template.find('.pet-breed').text(data[i].breed);
        Template.find('.pet-age').text(data[i].age);
        Template.find('.pet-location').text(data[i].location);
        Template.find('.btn-adopt').attr('data-id', data[i].id);

        collectiveRow.append(Template.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('energyTrading.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var energyTradingArtifact = data;
      App.contracts.energyTrading = TruffleContract(energyTradingArtifact);

      // Set the provider for our contract
      App.contracts.energyTrading.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      return App.contracts.energyTrading.getUsers();
    });

    return App.bindEvents();
  },

  //  bindEventstwo: function() {
  //   $(document).on('click', '.btn-add', App.addCollectivenew);
  // },

  bindEvents: function() {
    $(document).on('click', '.btn-adopt', App.handleCollective);
  },



  getUsers: function(users, account) {
    var energyTradingInstance;

    App.contracts.energyTrading.deployed().then(function(instance) {
      energyTradingInstance = instance;

      return energyTradingInstance.getUsers.call();
    }).then(function(users) {
      for (i = 0; i < users.length; i++) {
        if (users[i] !== '0x0000000000000000000000000000000000000000') {
          $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
        }
      }
    }).catch(function(err) {
      console.log(err.message);
    });
  },

// NOT WORKING YET
  addCollectivenew: function() {
     let addr;
     var energyTradingInstance;

     $('#addAdmin').submit(function( event ) {
       addr = $("input#adminAddrAdd").val();
       console.log(addr);
       nHomes = $("input#adminNumberHomes").val();
       web3.eth.getAccounts(function(error, accounts) {
         if (error) {
           console.log(error);
         }

         var account = accounts[0];
         App.contracts.energyTrading.deployed().then(function(instance) {
           energyTradingInstance = instance;
           console.log(addr)
           return energyTradingInstance.addCollective(addr, nHomes, {from: account});
         });
       });
       event.preventDefault();
     });
   },

  handleCollective: function(event) {
    event.preventDefault();

    var userId = parseInt($(event.target).data('id'));

    var energyTradingInstance;

    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      var account = accounts[0];

      App.contracts.energyTrading.deployed().then(function(instance) {
        energyTradingInstance = instance;

        // Execute adopt as a transaction by sending account
        return energyTradingInstance.enroll();
      }).then(function(result) {
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  }



};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
