// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public balance;
    uint public minimumAge = 18; // Minimum age required

    event Deposit(uint256 amount);
    event Withdraw(uint256 amount);

    constructor(uint initBalance) payable {
        owner = payable(msg.sender);
        balance = initBalance;
    }

    function getBalance() public view returns(uint256) {
        return balance;
    }

    function deposit(uint256 _amount) public payable {
        uint _previousBalance = balance;

        // Ensure this is the owner
        require(msg.sender == owner, "You are not the owner of this account");

        // Check age before allowing the deposit
        require(checkAge(msg.sender), "You must be at least 18 years old to deposit");

        // Perform transaction
        balance += _amount;

        // Assert transaction completed successfully
        assert(balance == _previousBalance + _amount);

        // Emit the event
        emit Deposit(_amount);
    }

    // Custom error
    error InsufficientBalance(uint256 balance, uint256 withdrawAmount);

    function withdraw(uint256 _withdrawAmount) public {
        require(msg.sender == owner, "You are not the owner of this account");
        uint _previousBalance = balance;

        // Check age before allowing the withdrawal
        require(checkAge(msg.sender), "You must be at least 18 years old to withdraw");

        if (balance < _withdrawAmount) {
            revert InsufficientBalance({
                balance: balance,
                withdrawAmount: _withdrawAmount
            });
        }

        // Withdraw the given amount
        balance -= _withdrawAmount;

        // Assert the balance is correct
        assert(balance == (_previousBalance - _withdrawAmount));

        // Emit the event
        emit Withdraw(_withdrawAmount);
    }

    function setMinimumAge(uint _age) public {
        require(msg.sender == owner, "You are not the owner of this account");
        minimumAge = _age;
    }

    function checkAge(address _user) internal view returns (bool) {
        return minimumAge <= 18;
    }
}