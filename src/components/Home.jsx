import React, { useState, useEffect, useContext } from 'react';
import { ethers, formatEther } from 'ethers';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import toast from 'react-hot-toast';
import InfoSection from './InfoSection';
import { AdminContext } from '../mycontext';
import Admin from './Admin';

const Home = () => {
  const { isAdmin,setIsAdmin } = useContext(AdminContext);
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
    console.log("connec")
    if (window.ethereum) {
      try {
        const accounts = await provider.send("eth_requestAccounts", []);

        if(accounts){
          toast('Connected!',
            {
              icon: '👏',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
                padding: "20px",
              },
            }
          );
        }

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
    !isAdmin ? 
    <div className=' pt-[9rem]'>
      <h1 className="px-2 relative z-10 text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Experience Lightning-Fast Insurance Solutions <br className='hidden sm:block'/> with the Power of Blockchain <span className='text-yellow-400'>⚡️</span>
        </h1>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      {defaultAccount ? (
        <>
        {showDashboardBtn && 
        <div className="mt-10 flex justify-center text-center">
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6  text-white inline-block" onClick={()=>navigate("/dashboard")}>
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-4 px-8 ring-1 ring-white/10 ">
            <span>
              Go To Dashboard
            </span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
        </div>
        }
        </>
      ) : (
      <div className="mt-10 flex justify-center text-center">
        <div onClick={connectWalletHandler}>
          <button className="inline-flex h-12 animate-shimmer text-xl items-center justify-center rounded-3xl border border-slate-600 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] py-6 px-16 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 " >
            Connect Wallet
          </button>
        </div>
      </div>
      )}


      <InfoSection/>
    </div> : <Admin/>
  );
};

export default Home;


/*
<button className='p-2 rounded-xl  bg-black text-xl text-white text-center font-sans' disabled>
          Connected: {defaultAccount} (View Balance: {userBalance})
        </button>
 */