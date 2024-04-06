import React from "react";
import "../font.css";
import { useAuthStore } from "../store/store";
import { useEffect } from "react";
import { useState } from "react";
import { ethers } from "ethers";
import { abi } from "../../artifacts/InsuranceContractABI";

const Navbar = () => {

  useEffect(()=>{
    accessContract()
  },[])


  const contractAddress = "0xb00f410ee2c695917fa891c1184256c4b977fc96";

  const { policies,provider } = useAuthStore();
  const setPolicies = useAuthStore((state) => state.updatePolicies);
  const [providerContract,setProviderContract] = useState();

  const accessContract = async () => {
    try {
      if (window.ethereum) {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, abi, provider);
        setProviderContract(contract);
      } else {
        console.error("MetaMask is not installed or not connected");
      }
    } catch (error) {
      console.error("Error accessing contract:", error);
    }
  };

  const getUserPolicies = async () => {
    try {
      if (providerContract) {
        // If providerContract is defined, proceed with calling methods
        const gettingPolicies = await providerContract.getPolicies();
        console.log(gettingPolicies);
  
        const getPoliciesString = gettingPolicies.toString();
        console.log("Policies:", getPoliciesString);
  
        setPolicies(gettingPolicies);
        console.log(policies);
      } else {
        console.error("Provider contract is undefined");
      }
    } catch (error) {
      console.error("Error calling getPolicies :", error);
    }
  };
  

  return (
    <header className="z-[50] fixed top-0 w-full border-b  backdrop-blur-sm bg-white/[0.6] dark:bg-black/[0.6] border-zinc-700">
      <div className="p-[2rem] md:p-0 flex h-16 items-center max-w-[88rem] mx-auto">
        <div className="mr-4 hidden md:flex">
          <a
            className="flex items-center justify-center space-x-2 text-xl font-bold py-6 text-center text-neutral-600 dark:text-gray-100 selection:bg-emerald-500 mr-10"
            href="/"
          >
            <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white   flex items-center justify-center rounded-md text-sm antialiased">
              <div className="absolute h-20 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
              <div className="text-sm h-full text-emerald-500 relative z-20">
                <img
                  alt="Logo"
                  loading="lazy"
                  width="80"
                  height="80"
                  decoding="async"
                  data-nimg="1"
                  src="./link-hyperlink-color-icon.svg"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-white">Chain Cover</h1>
            </div>
          </a>
        </div>
        <a
          className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:text-accent-foreground h-9 py-2 mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          type="button"
          aria-haspopup="dialog"
          aria-expanded="false"
          aria-controls="radix-:rn:"
          data-state="closed"
          href="/"
        >
          <div className="relative h-8 w-8 md:h-6 md:w-6 bg-black border border-slate-800  text-white  flex items-center justify-center rounded-md text-sm antialiased">
            <div className="absolute h-10 w-full bg-white/[0.2] -top-10 inset-x-0 rounded-full blur-xl"></div>
            <div className="text-sm  text-emerald-500 relative z-20">
              <img
                alt="Logo"
                loading="lazy"
                width="50"
                height="50"
                decoding="async"
                data-nimg="1"
                src="./link-hyperlink-color-icon.svg"
              />
            </div>
          </div>
          <span className="ml-2 text-white text-2xl">Chain Cover</span>
        </a>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-2 md:justify-end">
          <button className="p-[3px] relative mr-4" onClick={()=>getUserPolicies()}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              My Policies
            </div>
          </button>
          <button className="sm:flex relative hidden justify-start items-center text-sm text-muted-foreground dark:border-white/[0.2] py-2 w-fit border border-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] px-4 rounded-xl bg-white dark:bg-brand">
            <span className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm font-medium pl-2 pr-4">
              Contact Us
            </span>
            <kbd className="pointer-events-none  hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">⌘</span>K
            </kbd>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
