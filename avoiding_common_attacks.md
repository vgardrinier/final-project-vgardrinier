#Avoiding Common Attacks


#External Calls

No external calls are made to prevent maliscious attacks from external contracts.

#Transferring value

 `transfer ` is used over  `send` in the following functions:
 python ```
 function buyEnergy()
 function getRefund()
 function endSale ()
```

# OpenZeppelin battletested contracts against Reentrency & Overflow / Underflow
Again,once OpenZeppelin Error is resolved:
Use of OpenZeppelin Reentrancy Guard contract.
Use of OpenZeppelin SafeMath library for safe operations on top of UINT256.

#Static Analysis
Use of MythX
I ran:
`truffle verify contracts/energyTrading.sol ` 

to detect my smart contract vulnerabilities.


# Avoid Using tx.origin
Used msg.sender over tx.origin.
Why?
When used for authorization,another contract can have a method which will call your contract 
(where the user has some funds for instance) and your contract will authorize that transaction as your address is in tx.origin.

#tradeoff between assert() and require()
assert() is not used, but require() is used to validate input. See design_pattern_decisions.md for more details.

#Use of Loops
Only when necessary. However I believe I can still do better in that regard.

#Explicitely marked visibility in all functions and state variables
All function visibility is explicitly marked in energyTrading.sol, same for state variables

#Lock Pragmas to specify compiler version
All Solidity files use Pragma 0.5.8.
