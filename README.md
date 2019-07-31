# final-project-vgardrinier

#Introduction
This project is the first iteration of what I hope to be a P2P Solar Energy Trading System at a Neighborood scale.

It was built as the final project of the 2019 ConsenSys Developer Bootcamp.

 In brief, Home Owners with low rooftop potential (bad inclination or location), can collaborate with their neighbors by either investing in the purchase of their solar Panels or simply by paying of monthly fee (which fluctuates according to the grid's energy price) in exchange for a certain percentage of the other Home Owner's Solar Energy (electricity).
The first iteration only test with what I call Energy Units of 150 wei to simplify the transactions and no native Tokens.
We focus our attention on 4 test collectives (aka Neighbouroods)but the idea is to operate at a global scale in the near future.

It is written in Solidity and compiled using solc version 0.5.8.
It can be deployed toa development Blockchain like Ganache. Future iterations will include Testnets such as Rinkeby and the Ethereum mainnet. 

As currency for energy purchases, it uses Ethereum's native Ether.


a. The following instructions assume that you are using a *nix-like OS (e.g. Linux, macOS etc.) from its command-line and that Git is already installed.
b. Install Truffle.
For more information, follow the instructions found [here](https://truffleframework.com/docs/truffle/getting-started/installation).

`$ npm install truffle -g`

c. Install Ganache CLI.
For more information, follow the instructions found [here](https://truffleframework.com/docs/ganache/quickstart).

`$ npm install ganache-cli -g`

d. Go to a directory of your preference in your computer (e.g. ~/Desktop).
e. Download or clone final-project-vgardrinier repo to your computer.
f. Go to the new directory.

  `cd final-project-vgardrinier `
  
#Additional Information: 
The truffle-config.js is configured for the following networks:
development and ganachecli using port 8545;
ganachegui using port 7545;

Now, Open 2 new terminal windows.
In the 1st one, run ganache-cli to start your local blockchain. Copy the mnemonic phrase in a safe place (offline).
You should see something similar:

 `Ganache CLI v6.4.4 (ganache-core: 2.5.6)

Available Accounts
==================
(0) 0x495628fca71d66a3230216ed9dc07906a74ffe90 (~100 ETH)
(1) 0xf3a9c0de656beb408c5bc03e83bc362bb5fc8654 (~100 ETH)
(2) 0x56f97d00611d7385057be8bf7430b5dc4b55e58e (~100 ETH)
(3) 0x62e7d26eefa2f09f32e4d873db252e8f04678a3c (~100 ETH)
(4) 0x94d4a922fd1cceae3ef6db2d16c7c5168eb7cf23 (~100 ETH)
(5) 0x06bd8779f468b4d93abccc465af70d0365da0340 (~100 ETH)
(6) 0x7485fdff3dcba35e5b8695bd5a807e51975b9242 (~100 ETH)
(7) 0x1ba1c14241b3e60725e8575f131f22098a0c6a2a (~100 ETH)
(8) 0xe2fda114476bc856df74391f6de2e4f0a52ee2d8 (~100 ETH)
(9) 0x260746b43fa155047fcdd3656ff215a53d07671a (~100 ETH)

Private Keys
==================
(0) 0x173f5d92d39a216e22f88a3c53e31cd3e21e1a59c435edd4bad0b50b18086ebb
(1) 0xc2ca45053ef14e9aa71f35f0f00e2ad92a5311d1da2e7a9bad0930ddd7e6aa69
(2) 0x8211702b477ac0e08f5ce2e67e822154f04fa5d9b58f7c923339b55448bd07cd
(3) 0xbd580b361eb6fd229bbc86f4f7ac36a69a1efaea4e7ac94fcd7608a84c4b76bf
(4) 0x835bb9c966f4dafa20f2e0b5eb72b4fe33ff94739c5b1b12ac8c476391a908ec
(5) 0xadb981b80361139c1eaacea033f681c2f9b8c9f83c0979e06a6242c0a6208270
(6) 0x6a440d012f74e608f657c8a2a5841bc0cc1a60b44a11ded81460f2114f202a03
(7) 0x81fc80ca614305c995af4fa5393e5d365ef5a4ed824c54b5e7694c59d317baac
(8) 0xd8d51be1654adcbab5265188d9162d0687871191074552f98bf0680fbedb024c
(9) 0xb4f7124b76c1122f8cb83a62b486364044cbdbe0caa65316de9c89ec46c5e177

HD Wallet
==================
Mnemonic:      top video quarter nasty catch brass mixed lemon diamond unusual finish toward
Base HD Path:  m/44'/60'/0'/0/{account_index}

Gas Price
==================
20000000000

Gas Limit
==================
6721975

Listening on 127.0.0.1:8545`

In the second terminal window, run truffle compile and truffle migrate to deploy your contracts on your local blockchain.
This is what you should see:

`Starting Migrations:

> Network name:    'development'
> Network id:      1564607200066
> Block gas limit: 0x6691b7


1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0xa53e9564fc956d91df0f7abbcb96df886f27025d005d34a5b993212245e77837
   > Blocks: 0            Seconds: 0
   > contract address:    0x13dA7736104E95A639072287a2482A55Fec48d03
   > block number:        1
   > block timestamp:     1564607347
   > account:             0x495628fcA71d66a3230216ED9dC07906A74FFE90
   > balance:             99.99477342
   > gas used:            261329
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00522658 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00522658 ETH


2_deploy_contracts.js
=====================

   Deploying 'EnergyTrading'
   -------------------------
   > transaction hash:    0xddda64a95cdc8cc2484fabf5b7b325b037a170af502684a19026f89bb793f7d6
   > Blocks: 0            Seconds: 0
   > contract address:    0x453c8c31c879c5699e524E8dEc6a4c5358E02921
   > block number:        3
   > block timestamp:     1564607348
   > account:             0x495628fcA71d66a3230216ED9dC07906A74FFE90
   > balance:             99.96063386
   > gas used:            1664955
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0332991 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0332991 ETH


Summary
=======
> Total deployments:   2
> Final cost:          0.03852568 ETH`

Once the migration is complete, run:
`npm run dev` for the application to start. 
A window should automatically open to localhost:3000. If not, open your browser which uses MetaMask and enter localhost:3000 as the URL.

Before Using Metamask:
Log Out of your current account and then click "Restore from seed phrase". Paste the seed phrase you have copied from the ganache-cli terminal window and set a temporary password. 

Now we need to connect MetaMask to the blockchain created by Ganache. Click the menu that shows "Main Network" and select Custom RPC.
In the box titled "New Network" enter http://127.0.0.1:8545 and click Save.
The network name at the top will switch to say http://127.0.0.1:8545.

Click the top-right X to close out of Settings and return to the Accounts page.

Each account created by Ganache is given 100 ether. You'll notice it's slightly less on the first account because some gas was used when the contract itself was deployed and when the tests were run.

#Testing
Depending on if you use `truffle develop` and then `compile` or ganache-cli and `truffle test` some tests from the energyTrading_test.js file that I commented out will work, feel free to "uncomment them". 

If you followed the instruction - you just have to run:
`truffle test`
The 5 tests should pass.
Explanation for each test can be found as comments in the energyTrading_tests.js file.


