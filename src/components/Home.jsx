import React, { useState, useEffect } from 'react';
import { ethers, formatEther } from 'ethers';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [showDashboardBtn,setShowDashboardBtn] = useState(false);
  const navigate = useNavigate(); 

  let signer;
  const provider = new ethers.BrowserProvider(window.ethereum);

  const connectWalletHandler = async () => {
    if (window.ethereum) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);
        setDefaultAccount(accounts[0]);

        signer = await provider.getSigner();
        console.log('Signer:', typeof(signer));

        
        if (accounts[0]) {
          const balance = await provider.getBalance(accounts[0]);
          setUserBalance(formatEther(balance));
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
        setDefaultAccount(accounts[0]); // Set default account if already connected
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
