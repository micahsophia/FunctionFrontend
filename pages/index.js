import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

const ethToPhpRate = 95566.56;

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const [userAge, setUserAge] = useState(undefined);
  const [balanceInPhp, setBalanceInPhp] = useState(undefined);

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      const ethBalance = (await atm.getBalance()).toNumber();
      setBalance(ethBalance);

      // Convert ETH to PHP
      const phpBalance = (ethBalance * ethToPhpRate).toFixed(2);
      setBalanceInPhp(phpBalance);
    }
  };

  const deposit = async () => {
    if (atm) {
      try {
        let tx = await atm.deposit(1);
        await tx.wait();
        getBalance();
        alert("Deposit successful!");
      } catch (error) {
        console.error("Deposit error:", error);
        alert("Deposit failed. Please try again later.");
      }
    }
  };
  
  const withdraw = async () => {
    if (atm) {
      try {
        let tx = await atm.withdraw(1);
        await tx.wait();
        getBalance();
        alert("Withdrawal successful!");
      } catch (error) {
        console.error("Withdrawal error:", error);
        alert("Withdrawal failed. Insufficient balance or other error occurred.");
      }
    }
  };  

  const containerTitle = {
    fontFamily: "Courier New, monospace",
    textAlign: "center",
    backgroundColor: "#662549", 
    color: "white", 
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "800px",
    margin: "0 auto",
  };

  const containerStyle = {
    fontFamily: "Courier New, monospace",
    textAlign: "center",
    backgroundColor: "#451952",  
    color: "white", 
    borderBottomLeftRadius: "15px",
    borderBottomRightRadius: "15px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    width: "800px",
    margin: "0 auto",
  };

  const buttonStyle = {
    fontFamily: "Courier New, monospace",
    backgroundColor: "#F39F5A", 
    color: "white", 
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    margin: "10px",
    cursor: "pointer",
    borderRadius: "15px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "16px",
    width: "300px",
    marginBottom: "20px",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const disabledButtonStyle = {
    fontFamily: "Courier New, monospace",
    backgroundColor: "#FFBA86", 
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    margin: "10px",
    cursor: "not-allowed",
    pointerEvents: "none", 
    borderRadius: "15px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install MetaMask to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button onClick={connectAccount} style={buttonStyle}>
          Please connect your MetaMask wallet
        </button>
      );
    }

    if (balance === undefined) {
      getBalance();
    }

    // Check if user is old enough to deposit/withdraw
    const canDepositWithdraw = userAge >= 18;

    return (
      <div>
        <p>Your Account: <b>{account}</b></p>
        <p>Your Balance: <b>{balance} ETH</b></p>
        {balanceInPhp !== undefined && (
          <p>Your Balance in PHP: <b>{balanceInPhp} PHP</b></p>
        )}
        <p>Your Age: <b>{userAge} Years Old</b></p>

        <br></br><p><b>Enter your age below (Number Only):</b></p>
        <input
          type="number"
          placeholder="Enter Your Age"
          onChange={(e) => setUserAge(e.target.value)}
          style={inputStyle}
        /><br></br>
        <button onClick={deposit} disabled={!canDepositWithdraw} style={!canDepositWithdraw ? disabledButtonStyle : buttonStyle}>
          <b>Deposit 1 ETH</b>
        </button>
        <button onClick={withdraw} disabled={!canDepositWithdraw} style={!canDepositWithdraw ? disabledButtonStyle : buttonStyle}>
          <b>Withdraw 1 ETH</b>
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main>
      <header>
        <h1 style={containerTitle}>Welcome to the Age Restricted ATM!</h1>
      </header>
      <div style={containerStyle}>
        {initUser()}
      </div>
    </main>
  );
}