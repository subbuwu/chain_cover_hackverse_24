import React, { useEffect } from 'react';
import { useAuthStore } from '../store/store';
import { ethers, parseEther } from 'ethers';
import { abi } from '../../artifacts/InsuranceContractABI';
import { useState } from 'react';
import { BentoGridItem } from './ui/BentoGridItem';

const contractAddress = "0x853a38acc026557fb1ef9a64ccbf67e54936e789";

const Dashboard = () => {
  
  const { isOpen,account,signer } = useAuthStore();
  const setIsOpen = useAuthStore((state) => state.setOpen);

  if(!account || !signer) {
    window.location.href = "/";
  }

  return (
    <div className='pt-[9rem] w-full h-full'>

      <div className='w-full h-full grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 sm:gap-6 gap-8 max-w-7xl mx-auto px-4 sm:p-0'>
        <BentoGridItem imgSrc="./car.svg"  title="Car Insurance" desc="Your Wheels. Our Shield"  attachedFunction={()=>setIsOpen(true)}/>
        <BentoGridItem imgSrc="./health.svg"  title="Health Insurance" desc="Health Insurance: Your Wellness, Our Priority." attachedFunction={()=>setIsOpen(true)}/>
        <BentoGridItem imgSrc="./termlife.svg"  title="Term Life Insurance" desc="Securing Your Legacy, Ensuring Peace of Mind." attachedFunction={()=>setIsOpen(true)}/>
        <BentoGridItem imgSrc="./crop.svg"  title="Agri Insurance" desc="Cultivating Confidence, Harvesting Security." attachedFunction={()=>setIsOpen(true)}/>
        <BentoGridItem imgSrc="./ret.svg"  title="Retirement Solutions" desc="Make money even if you retire." attachedFunction={()=>setIsOpen(true)}/>
        <BentoGridItem imgSrc="./home.svg"  title="Home Insurance" desc="Protecting your heaven one policy at a time." attachedFunction={()=>setIsOpen(true)}/>
      </div> 
    </div>
  );
};

export default Dashboard;
