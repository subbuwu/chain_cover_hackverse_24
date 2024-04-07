// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChainCover {
    address public hospitalAdmin;
    address public labAdmin;

    struct Insurance {
        uint256 ID;
        uint256 price;
        uint256 signatureCount;
        string policyName;
        string date;
        string hospitalName;
        
        mapping (address => uint256) signatures;
    }
    struct Policy{
        string policyName;
        uint premiumPaid;
        string coverageAmount;
        uint timestamp;
        address from;
    }
    struct claimPolicy{
        string policyName;
        string amountApplied;
    
    }
     Policy[] policies;
    address payable owner; 
    constructor(address _labAdmin){
        owner = payable(msg.sender);
        hospitalAdmin = msg.sender;
        labAdmin = _labAdmin;
    }

    function purchasePolicy(string calldata policyName,string calldata coverageAmount) external payable{
        require(msg.value>0,"Please pay more than 0 ether");

        owner.transfer(msg.value);
        policies.push(Policy(policyName,msg.value,coverageAmount,block.timestamp,msg.sender));
    }

    function getPolicies() public view returns(Policy[] memory){
        return policies;
    }

    
    claimPolicy[] claims;
    function applyClaim( string calldata  policyName , string calldata amountApplied ) external payable {
        claims.push(claimPolicy(policyName,amountApplied));
    }
    function getClaims() public view returns(claimPolicy[] memory){
        return claims;
    }

   

    // Mapping to store records
    mapping (uint256=> Insurance) public _records;
    uint256[] public recordsArr;

    event recordCreated(uint256 ID, string testName, string date, string hospitalName, uint256 price);
    event recordSigned(uint256 ID, string testName, string date, string hospitalName, uint256 price);

    modifier signOnly {
        require (msg.sender == hospitalAdmin || msg.sender == labAdmin, "You are not authorized to sign this.");
        _;
    }

    modifier checkAuthBeforeSign(uint256 _ID) {
        
        require(_records[_ID].signatures[msg.sender] != 1, "Same person cannot sign twice.");
        _;

    }

    modifier validateRecord(uint256 _ID) {
        
        _;
    }

   

    
    function signRecord(uint256 _ID) signOnly checkAuthBeforeSign(_ID) public {
        Insurance storage records = _records[_ID];
        records.signatures[msg.sender] = 1;
        records.signatureCount++;

        
        if(records.signatureCount == 2)
            emit  recordSigned(records.ID, records.policyName, records.date, records.hospitalName, records.price);

    }
}