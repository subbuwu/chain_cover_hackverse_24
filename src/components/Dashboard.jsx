import React, { useEffect } from 'react';
import { useAuthStore } from '../store/store';
import { ethers, parseEther } from 'ethers';
import { abi } from '../../artifacts/InsuranceContractABI';
import { useState } from 'react';
import { BentoGridItem } from './ui/BentoGridItem';

const contractAddress = "0x1447f4e60f609625f6fe6b9fe4c404fd2f4a9e95";

const Dashboard = () => {
  
  const { isOpen,account,signer } = useAuthStore();
  const setIsOpen = useAuthStore((state) => state.setOpen);
  const setContract = useAuthStore((state) => state.updateContract);


  const accessContract = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      setContract(contract)
      console.log(contract)
    } catch (error) {
      console.error("Error accessing contract:", error);
    }
  };

  useEffect(() => {
    if (!account || !signer) return;
    accessContract()
  }, [account, signer]);


  return (
    <div className='pt-[9rem] w-full h-full'>

      <div className='w-full h-full grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 sm:gap-6 gap-8 max-w-7xl mx-auto px-4 sm:p-0'>
        <BentoGridItem imgSrc="./car.svg"  title="Car Insurance" desc="Your Wheels. Our Shield"  attachedFunction={()=>setIsOpen(true)}/>
        <BentoGridItem imgSrc="./car.svg"  title="Car Insurance" desc="Your Wheels. Our Shield" />
      </div> 
    </div>
  );
};

export default Dashboard;
