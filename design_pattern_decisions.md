
#Design Pattern Decisions

Calls to untrusted contracts can introduce several unexpected risks or errors. 
As external calls may execute malicious code in that contract or any other contract that it depends upon.
I restricted the use of external libraries to OpenZeppelin Ownable, Pausable and Destrictible contracts.

However, when compiling, my terminal does not recognize the path when I import my OpenZeppelin contracts.
I suspect I need to download both the npm and ethpm version of openzeppelin. Will look into that.

#Error Management
Used `require` to trigger an error instead of `if ` in the following modifiers and functions:

```python
function pay()
function buyEnergy() --> twice
function getRefund()
function endSale()
```

#Extensive use of require for restricting access to functions according to account role.

Used `modifier isOwner()`to trigger an error if someone other than the other is calling the function.
(Once the OpenZeppelin error is resolved, I will use Ownable.sol.)

```python
function addCollective()
function updateCollective()
function endSale
```


