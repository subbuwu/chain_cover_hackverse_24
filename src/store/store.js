import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  account: null,
  provider: null,
  signer: null,
  userBalance: null,
  updateAccount: (newAccount) => set({ account: newAccount }),
  updateProvider: (newProvider) => set({ provider: newProvider }),
  updateSigner: (newSigner) => set({ signer: newSigner }),
  setUserBalance: (balance) => set({ userBalance: balance }),
  isOpen: false,
  setOpen: (newIsOpen) => set({ isOpen: newIsOpen }),
}));
