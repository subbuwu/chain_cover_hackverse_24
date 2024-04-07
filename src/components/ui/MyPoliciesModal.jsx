import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useAuthStore } from '../../store/store';
import ModalTableItem from './ModalTableItem'; // Import the ModalTableItem component
import { useEffect, useState } from 'react'; // Update import statement to include useState
import { abi } from '../../../artifacts/InsuranceContractABI';
import { ethers } from 'ethers';

export default function MyPoliciesModal() {
    useEffect(() => {
        accessContract();
    }, []);

    const { isMyPolicyModalOpen } = useAuthStore()
    const setPolicyModalOpen = useAuthStore((state) => state.setPolicyModalOpen);
    const contractAddress = "0x43ea341576eda17fd17792c29c0cc6916b5fc098";

    const [policies, setPolicies] = useState([]);
    const [providerContract, setProviderContract] = useState();

    const accessContract = async () => {
        try {
            if (window.ethereum) {

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
                const gettingPolicies = await providerContract.getPolicies();
                setPolicies(gettingPolicies);
            } else {
                console.error("Provider contract is undefined");
            }
        } catch (error) {
            console.error("Error calling getPolicies :", error);
        }
    };

    useEffect(() => {
        getUserPolicies(); // Call getUserPolicies when providerContract changes
    }, [providerContract]);

    function closeModal() {
        setPolicyModalOpen(false);
    }

    function openModal() {
        setPolicyModalOpen(true);
    }

    return (
        isMyPolicyModalOpen &&
        <>
            <Transition appear show={isMyPolicyModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/85" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full w-[80%] mx-auto items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full mx-auto transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-3xl mb-8 font-bold text-center  text-black"
                                    >
                                        My Policies
                                    </Dialog.Title>

                                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" className="px-6 py-3">
                                                        Policy Name
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        Coverage Amount
                                                    </th>
                                                    <th scope="col" className="px-6 py-3">
                                                        <span className="sr-only">Edit</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                    policies.map((policy)=>(
                                                        <ModalTableItem
                                                            policyName={policy.policyName}
                                                            coverageAmount={policy.coverageAmount}
                                                            premAmtPaid={policy.premiumPaid}
                                                        />
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}
