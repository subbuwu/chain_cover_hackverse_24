import React, { useEffect } from 'react';
import { useAuthStore } from '../store/store';
import { ethers, parseEther } from 'ethers';
import { abi } from '../../artifacts/InsuranceContractABI';
import { useState } from 'react';

const contractAddress = "0x1447f4e60f609625f6fe6b9fe4c404fd2f4a9e95";

const Dashboard = () => {
  const { account, signer } = useAuthStore();
  const [contract,setContract] = useState();

  useEffect(() => {
    if (!account || !signer) return;

    accessContract();
  }, [account, signer]);

  const accessContract = async () => {
    try {
      const contract = new ethers.Contract(contractAddress, abi, signer);
      console.log(contract);
      setContract(contract)
    } catch (error) {
      console.error("Error accessing contract:", error);
    }
  };

  const purchasePolicy = async (policyName,coverageAmt,premAmt) => {
    try {
      // Send transaction to the smart contract
      const transaction = await contract.purchasePolicy(policyName,coverageAmt,{value:premAmt});
      await transaction.wait();
      console.log("Transaction successful");
    } catch (error) {
      console.error("Error calling purchasePolicy:", error);
    }
  };

  return (
    <div className='p-10'>
      <button className='p-2 rounded-xl m-5 bg-black text-xl text-white text-center font-sans' onClick={()=>purchasePolicy("Car Insurance","4",parseEther('2'))}>
        Purchase car policy
      </button>
    </div>
  );
};

export default Dashboard;






// purchasePolicy(60,2,{10})