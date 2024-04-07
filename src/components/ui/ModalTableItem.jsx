import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAuthStore } from '../../store/store';
import { abi } from '../../../artifacts/InsuranceContractABI';

const ModalTableItem = ({ policyName, coverageAmount, premAmtPaid }) => {
    const [claimAmount, setClaimAmount] = useState('');
    const [proof, setProof] = useState(null);
    const [loading, setLoading] = useState(false);

    const contractAddress = "0x853a38acc026557fb1ef9a64ccbf67e54936e789";
    
    const handleClaim = async (e) => {
        e.preventDefault();
        const provider =  new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        
        try {
            setLoading(true);
            // Call the Solidity function 'applyClaim' from the smart contract
            const tx = await contract.applyClaim(policyName, coverageAmount);
            await tx.wait();
            console.log('Claim applied successfully');
            setLoading(false);
            // Reset form fields after successful claim
            setClaimAmount('');
            setProof(null);
        } catch (error) {
            console.error('Error claiming:', error);
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setProof(file);
    };

    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {policyName}
            </th>
            <td className="px-6 py-4">
                {coverageAmount}
            </td>
            <td className="px-6 py-4 text-right">
                <form onSubmit={handleClaim} className="flex flex-col items-end">
                    <label htmlFor="claimAmount" className="text-sm text-gray-600 mt-2">Claim Amount:</label>
                    <input
                        type="number"
                        id="claimAmount"
                        value={claimAmount}
                        onChange={(e) => setClaimAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="p-2 border border-gray-300 rounded-md w-full mt-1"
                        required
                    />
                    <label htmlFor="proof" className="text-sm text-gray-600 mt-2">Proof (if any): </label>
                    <input
                        type="file"
                        id="proof"
                        onChange={handleFileChange}
                        className="p-2 border border-gray-300 rounded-md w-full mt-1"
                    />
                    <button type="submit" disabled={loading} className={`mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${loading && 'opacity-50 cursor-not-allowed'}`} onClick={()=>handleClaim}>
                        {loading ? 'Claiming...' : 'Claim'}
                    </button>
                </form>
            </td>
        </tr>
    );
};

export default ModalTableItem;
