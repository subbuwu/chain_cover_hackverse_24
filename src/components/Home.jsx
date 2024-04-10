import React, { useState } from 'react';
import { ethers, formatEther } from 'ethers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AdminContext } from '../mycontext';
import InfoSection from './InfoSection';
import Admin from "./Admin";
import { useAuthStore } from '../store/store.js';
import { abi } from '../../artifacts/InsuranceContractABI.js';

const Home = () => {
  const contractAddress = "0x853a38acc026557fb1ef9a64ccbf67e54936e789";
  const [errorMessage, setErrorMessage] = useState();
  const [showDashboardBtn, setShowDashboardBtn] = useState(false);

  const { isAdmin, setIsAdmin } = useContext(AdminContext);
  
  const { account, setUserBalance } = useAuthStore();

  const updateSigner = useAuthStore((state)=>state.updateSigner);
  const updateContract = useAuthStore((state)=>state.updateContract);
  const updateAccount = useAuthStore((state)=>state.updateAccount);

  const navigate = useNavigate();

  const connectWalletHandler = async () => {
    try {
      setErrorMessage("");
  
      if (!window.ethereum) {
        toast.error('Please Install Metamask', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        }); // Explicit error for clarity
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum); // Use modern provider type
      const signer = await provider.getSigner();
  
      // Get accounts before updating signer and contract
      const accounts = await provider.send('eth_requestAccounts', []);
  
      if (accounts.length === 0) {
        toast.error('No Account in Metamask', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        }); // Handle missing accounts
      }
  
      updateSigner(signer);
      const contract = new ethers.Contract(contractAddress, abi, signer);
      updateContract(contract);
  
      toast.success('Connected To Metamask!', {
        style: {
          border: '1px solid #6af614',
          padding: '16px',
          color: '#007144',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    
  
      updateAccount(accounts[0]);
  
      const balance = await provider.getBalance(accounts[0]);
      const formattedBalance = formatEther(balance);
      setUserBalance(formattedBalance);
  
      setShowDashboardBtn(true);
    } catch (error) {
      console.error(error); // Log for debugging
  
      if (error.message.includes("Request of type 'wallet_requestPermissions' already pending")) {
        toast.error('There is already a wallet connection request in progress. Please complete it or refresh the page and try again.', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        }); // Handle pending request
      } else if (error.message.includes("MetaMask not installed")) {
        toast.error('MetaMask not installed', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        }); // Handle missing MetaMask
      } else {
        toast.error('Error Connecting to Metamask , Try Again !', {
          style: {
            border: '1px solid #713200',
            padding: '16px',
            color: '#713200',
          },
          iconTheme: {
            primary: '#713200',
            secondary: '#FFFAEE',
          },
        });
      }
    }
  };
    

  const handleConnectWalletClick = () => {
    connectWalletHandler();
  };

  const handleGoToDashboardClick = () => {
    navigate('/dashboard');
  };

  return (
    !isAdmin ? 
    <div className=' pt-[9rem]'>
      <h1 className="px-2 relative z-10 text-3xl md:text-5xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          Experience Lightning-Fast Insurance Solutions <br className='hidden sm:block'/> with the Power of Blockchain <span className='text-yellow-400'>⚡️</span>
        </h1>
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
      {account ? (
        <>
        {showDashboardBtn && 
        <div className="mt-10 flex justify-center text-center">
          <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xl font-semibold leading-6  text-white inline-block" onClick={handleGoToDashboardClick}>
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
        <div onClick={handleConnectWalletClick}>
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