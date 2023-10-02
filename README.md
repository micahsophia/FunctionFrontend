# Function Frontend - Age Restricted ATM
This GitHub repository contains a simple Ethereum-based Age Restricted ATM smart contract and a React-based front-end application to interact with the smart contract. The smart contract enforces an age restriction for depositing and withdrawing funds, and the front-end allows users to connect their MetaMask wallet, view their balance, and perform transactions.

## Smart Contract (Assessment.sol)
### Overview
- `Assessment.sol` is the Ethereum smart contract written in Solidity.
- It enforces age restrictions for depositing and withdrawing funds.
- Users must be at least 18 years old to interact with this contract.

### Features
- Deposit ETH into the contract.
- Withdraw ETH from the contract.
- Set the minimum age requirement for interactions with the contract.

### Contract Functions
1. `getBalance()`: View the contract's balance.
2. `deposit(uint256 _amount)`: Deposit ETH into the contract.
3. `withdraw(uint256 _withdrawAmount)`: Withdraw ETH from the contract.
4. `setMinimumAge(uint _age)`: Set the minimum age requirement for interactions.

### Custom Error
1. `InsufficientBalance(uint256 balance, uint256 withdrawAmount)`: Custom error for insufficient balance during withdrawal.

## Front-End (index.js)
### Overview
- `index.js` is a React-based front-end application that connects to the smart contract.
- Users can connect their MetaMask wallet, view their balance, and perform deposit and withdrawal transactions.

### Features
- Connect to MetaMask wallet.
- View ETH balance.
- View ETH balance converted to PHP.
- Deposit 1 ETH into the contract.
- Withdraw 1 ETH from the contract.
- Set the user's age for age verification.

## Getting Started
Follow these steps to run the code on your computer:
1. Clone this repository to your local machine.
2. In the project directory, open a terminal and run the following command to install project dependencies: `npm i`
3. Open two additional terminals within your code editor.
4. In the second terminal, start a local Ethereum node: `npx hardhat node`
5. In the third terminal, deploy the smart contract to your local Ethereum node: `npx hardhat run --network localhost scripts/deploy.js`
6. In the first terminal, start the front-end application: `npm run dev`
7. The project will now be running on your localhost. Access it using the following URL: http://localhost:3000/

## Note
- Ensure that you have MetaMask installed in your browser to connect your Ethereum wallet.
