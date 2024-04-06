import React, { useState, useEffect } from 'react';
import { ethers, formatEther } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';


const Home = () => {

  const [errorMessage, setErrorMessage] = useState();
  const [defaultAccount, setDefaultAccount] = useState();
  const [userBalance,setUserBalance] = useState();
  const [showDashboardBtn,setShowDashboardBtn] = useState(false);

  const navigate = useNavigate(); 

  const updateAccount = useAuthStore((state) => state.updateAccount);
  const updateProvider = useAuthStore((state) => state.updateProvider);
  const updateSigner = useAuthStore((state) => state.updateSigner);
  const setRecoilUserBalance = useAuthStore((state) => state.setUserBalance);

  const provider =  new ethers.BrowserProvider(window.ethereum);
  updateProvider(provider);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setDefaultAccount(accounts[0]);
        updateAccount(accounts[0]); // Update account state
  
        const signer = await provider.getSigner();
        updateSigner(signer);
  
        if (accounts[0]) {
          const balance = await provider.getBalance(accounts[0]);
          const formattedBalance = formatEther(balance);
          setUserBalance(formattedBalance); // Update user balance state
          setRecoilUserBalance(formattedBalance); // Update recoil user balance
        }
  
        setShowDashboardBtn(true);
      } catch (error) {
        setErrorMessage("Error connecting to MetaMask: " + error.message);
        console.error(error);
      }
    } else {
      setErrorMessage("Please Install MetaMask!");
    }
  };
  

  useEffect(() => {
    const checkMetaMaskConnection = async () => {
      const accounts = await provider.send("eth_accounts", []);
      if (accounts.length > 0) {
        setDefaultAccount(accounts[0]);
        updateAccount(accounts[0]); // Update account state
  
        const signer = await provider.getSigner();
        updateSigner(signer);
  
        // Get user balance and update state
        const balance = await provider.getBalance(accounts[0]);
        const formattedBalance = formatEther(balance);
        setUserBalance(formattedBalance);
        setRecoilUserBalance(formattedBalance);
  
        // Show dashboard button
        setShowDashboardBtn(true);
      }
    };
  
    checkMetaMaskConnection();
  }, [provider]); // Run effect only when provider changes
  

  return (
    <div>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      {defaultAccount ? (
        <>
        <button className='p-2 rounded-xl m-5 bg-black text-xl text-white text-center font-sans' disabled>
          Connected: {defaultAccount} (View Balance: {userBalance})
        </button>
        {showDashboardBtn && 
          <button className='p-2 rounded-xl mt-5 bg-blue-300 text-xl text-white text-center font-sans' onClick={()=>navigate("/dashboard")}>
          Go to dashboard
        </button>}
        </>
      ) : (
        <button className='p-2 rounded-xl m-5 bg-black text-xl text-white text-center font-sans' onClick={connectWalletHandler}>
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Home;
