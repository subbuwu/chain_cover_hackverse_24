"use client";
import React from "react";
import { Label } from "./ui/label.jsx";
import { Input } from "./ui/Input.jsx";
import { cn } from "../utils/cn.js";
import { parseEther } from "ethers";
import { useState } from "react";
import { useAuthStore } from '../store/store.js';

export function Form() {

  const { contract } = useAuthStore();
  
  const policyName = "Agriculture Policy"
  const coverageAmt = "1.5"
  
  const [amountCost,setAmountCost] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      let premAmt = parseEther(amountCost);
      console.log(contract)
      const transaction = await contract.purchasePolicy(policyName,coverageAmt,{value:premAmt});
      await transaction.wait();
      console.log(transaction);
    } catch (error) {
      console.error("Error calling purchasePolicy:", error);
    }
  };
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">

      <form className="my-8" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstname">First name</Label>
            <Input id="firstname" placeholder="Tyler" type="text" />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="number">Premium Amount Paying (eth) </Label>
          <Input id="number" placeholder="5" type="number" value={amountCost}
            onChange={(e) => setAmountCost(e.target.value)}/>
        </LabelInputContainer>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
          onClick={()=>handleSubmit}
        >
          Buy Now &rarr;
          <BottomGradient />
        </button>

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

        
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};
