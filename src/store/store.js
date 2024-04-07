import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  account: null,
  provider: null,
  signer: null,
  userBalance: null,
  contract: null,
  policies: null,
  updateAccount: (newAccount) => set({ account: newAccount }),
  updatePolicies: (newPolicies) => set({ policies: newPolicies }),
  updateContract: (newContract) => set({ contract: newContract }),
  updateAccount: (newAccount) => set({ account: newAccount }),
  updateProvider: (newProvider) => set({ provider: newProvider }),
  updateSigner: (newSigner) => set({ signer: newSigner }),
  setUserBalance: (balance) => set({ userBalance: balance }),
  isOpen: false,
  setOpen: (newIsOpen) => set({ isOpen: newIsOpen }),
  isMyPolicyModalOpen: false,
  setPolicyModalOpen: (newIsOpen) => set({ isMyPolicyModalOpen: newIsOpen }),
  isAdmin: false,
  setIsAdmin: (newIsAdmin) => set({ isAdmin: newIsAdmin }),
}));
