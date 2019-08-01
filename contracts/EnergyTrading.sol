pragma solidity 0.5.8;

/**
 * The energyTrading contract manages collectives and allows home owners to transact
 between each other. Energy producers can sell their energy and buyers pay for it in ether.
 The company or contract owner handles changes in home owners and the creation of new collectives.
 */

 // import "@openzeppelin/contracts/ownership/Ownable.sol";
 // import "@openzeppelin/contracts/lifecycle/Destructible.sol";
 // import "@openzeppelin/contracts/lifecycle/Pausable.sol";
 //The Ownable, Destructible and Pausable contracts are all taken from Zeppelin.
contract EnergyTrading {

   /*
        Define an public owner variable. Set it to the creator of the contract when it is initialized.
        Here, owner represents the energy company.
    */

  address payable public owner;
  //Fix price per KW. Random value which will be adjusted in real-time in future upgrades.
  uint ENERGY_UNIT_PRICE = 150 wei;

  //create a variable to keep track of the collectives with indexed ids.
  uint public idCollective;
  uint public SurplusRevenue = 0;

    // create array of users addresses.
    address[] public users;

  /*Define a Collective Struct with 5 fields. Note that here home owners (and their balances) in the collective
  are seperated into Producers - those who own our solar panels and produce energy - and
  buyers - those who collaborate with producers and pay a fee in exchnage for a certain amount of their energy */

  struct Collective {
    string information;
    uint totalHomes;
    bool isOpen;
    //maps each user address to the number of energy units they bought
    //We use fixed amount aka units to make it simpler at first. Think of it as monthly specific amount of energy needed for your home.
    mapping (address => uint) unitsPerUser;
  }


  //  Create a mapping to keep track of the collectives.
    mapping (address => uint) private balances;
    mapping (uint => Collective) collectives;


  // Not all home owners in a collective are enrolled in our Energy Trading program.
  //We account for this with an enrolled mapping.
  mapping (address => bool) enrolled;

  //Events section - each time the state is modified, we emit.
  event LogEnrolled(address accountAddress);
  event LogPaymentMade(address accountAddress, uint amount);
  event LogCollectiveAdded(string information, uint totalHomes, uint collectiveId);
  event LogGetRefund(address accountAddress, uint collectiveId, uint numUnitsRefunded);
  event LogEndSale(address accountAddress, uint SurplusAmount, uint collectiveId);
  event LogUpdated(uint collectiveId);

  // Constructor, can receive one or many variables here; only one allowed
  constructor() public {
      /* Set the owner to the creator of this contract */
      owner = msg.sender;
  }


    /*
        Create a modifier that throws an error if the msg.sender is not the owner.
    */
    modifier isOwner() {
      if(msg.sender != owner) { revert(); } _;
    }
  // Fallback function - Called if other functions don't match call or
  // sent ether without data
  // Typically, called when invalid data is sent
  // Added so ether sent to this contract is reverted if the contract fails
  // otherwise, the sender's money is transferred to contract
  function() external payable {
      revert();
  }

  function getBalance() public view returns (uint) {
      /* Get the balance of the sender of this transaction */
      return(balances[msg.sender]);
  }

  // enroll new users in a collective
  function enroll() public returns (bool){
    enrolled[msg.sender] = true;
    emit LogEnrolled(msg.sender);
  }

  //Checks if the user is enrolled in the collective or not.
  function isenrolled() public view returns(bool) {
    return(enrolled[msg.sender]);
  }
  // Users should be enrolled before they can make payments
  function pay(uint _amount) public payable returns (uint) {
      /* Add the amount to the user's balance, call the event associated with a deposit,
        then return the balance of the user */
    require(enrolled[msg.sender]);
    balances[msg.sender] += _amount;
    emit LogPaymentMade(msg.sender, _amount);
    return(balances[msg.sender]);
  }


  // FUNCTIONS FOR COLLECTIVES - Only the company aka the owner can add a new collective.
  //Only thhe Owner should be able to add a new collective on the platform.
  function addCollective (string memory _information, uint256 _totalHomes)
  public
  isOwner()
  returns (uint)
    {
    Collective memory newCollective;
    newCollective.information = _information;
    newCollective.totalHomes = _totalHomes;
    newCollective.isOpen = true;
    collectives[idCollective] = newCollective;
    idCollective++;
    // To obtain the right id, We substract 1 because we just increased idCollective by one
    emit LogCollectiveAdded(_information, _totalHomes, idCollective - 1);
    return(idCollective - 1);
  }

  //Anybody should be able to read a collective's information to make sure one joins the correct one.
  function readCollective (uint256 collectiveId) public view
  returns (string memory, uint, bool)
    {
    return(collectives[collectiveId].information,
      collectives[collectiveId].totalHomes,
      collectives[collectiveId].isOpen);
  }

//Only the Owner could update the collective if need be (new home Owner address, extented number of homes in one collective).
  function updateCollective (uint collectiveId, string memory _newinfo, uint _newTotalHomes) public
  isOwner()
  returns (string memory, uint, bool)
    {
      collectives[collectiveId].information = _newinfo;
      collectives[collectiveId].totalHomes = _newTotalHomes;
      emit LogUpdated(collectiveId);
      return(collectives[collectiveId].information,
        collectives[collectiveId].totalHomes,
        collectives[collectiveId].isOpen);
  }

  function getUsers () public view
  returns(address[] memory)  {
    return(users);
  }


  function buyEnergy (uint256 collectiveId, uint amountUnitsPurchased)
  public payable
  {
    require(collectives[collectiveId].isOpen);
    uint totalCost = amountUnitsPurchased * ENERGY_UNIT_PRICE;
    require(msg.value >= totalCost);
    collectives[collectiveId].unitsPerUser[msg.sender] += amountUnitsPurchased;

    if(msg.value > totalCost) {
      uint refundvalue = msg.value - totalCost;
      msg.sender.transfer(refundvalue);
    }
    emit LogPaymentMade(msg.sender, amountUnitsPurchased);
  }

  function getRefund (uint collectiveId) public payable
   {
    //a user has to have purchased energy units to even ask for a refund
    require(collectives[collectiveId].unitsPerUser[msg.sender] > 0);
    uint numUnitsRefunded = collectives[collectiveId].unitsPerUser[msg.sender];
    uint refundedamount = numUnitsRefunded * ENERGY_UNIT_PRICE;
    msg.sender.transfer(refundedamount);
    emit LogGetRefund(msg.sender, collectiveId, numUnitsRefunded);
  }

  // For user to know how much Energy and therefore Electricity have they bought.
  function getUserNumberOfUnits (uint collectiveId) public view
  returns (uint)
  {
    return(collectives[collectiveId].unitsPerUser[msg.sender]);
  }

    /*
      This Function allows the company to end a collective energy trading system.
            - close event sales
            - transfer the balance from those event sales to the contract owner
            - emit the appropriate event
    */
    //Best practices: Reducing the number of loops to just the length of the current user array of the specific collective.
    function endSale (uint collectiveId) public
      isOwner()
    {
    collectives[collectiveId].isOpen = false;
     address[] memory _users ;
    //add valid requiement modifier
    for (uint i=0; i <_users.length; i++) {
      require(collectives[collectiveId].unitsPerUser[_users[i]] > 0);
      uint userSurplus = collectives[collectiveId].unitsPerUser[_users[i]] * ENERGY_UNIT_PRICE;
      owner.transfer(userSurplus);
      SurplusRevenue += userSurplus;
    }
    // Here I am 'emitting' the total revenue from the Surplus instead of the sum of the user surplus from one collective. I'll probably change that in a later upgrade.
    emit LogEndSale(owner, SurplusRevenue, collectiveId);
  }
}
