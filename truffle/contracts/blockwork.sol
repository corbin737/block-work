pragma solidity ^0.4.18;

contract BlockWorkContract {
    address public requester;
    address public contractor;
    address public arbiter;

    string public agreement;
    string public work;

    uint public arbitrationFee;
    uint public contractFee;

    bool public isRejected;

    function BlockWorkContract(
        address _contractor,
        address _arbiter,
        string _agreement,
        uint _contractFee
    ) public payable {
        requester = msg.sender;
        contractor = _contractor;
        arbiter = _arbiter;
        agreement = _agreement;
        contractFee = _contractFee;
        arbitrationFee = msg.value - contractFee;
        isRejected = false;
    }

    function submit(string _work) public payable {
        require(msg.sender == contractor);
        require(msg.value == arbitrationFee);
        work = _work;
    }

    function approve() public {
        require(msg.sender == requester);
        contractor.transfer(contractFee + arbitrationFee);
        requester.transfer(arbitrationFee);
    }

    function reject() public {
        require(msg.sender == requester);
        isRejected = true;
    }

    function arbiterApprove() public {
        require(msg.sender == arbiter);
        require(isRejected == true);
        contractor.transfer(contractFee + arbitrationFee);
        arbiter.transfer(arbitrationFee);
    }

    function arbiterReject() public {
        require(msg.sender == arbiter);
        require(isRejected == true);
        requester.transfer(contractFee + arbitrationFee);
        arbiter.transfer(arbitrationFee);
    }

}
