import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useAuthStore } from '../../store/store';
import { Form } from '../Form';
import { useState } from 'react';

export default function Modal() {

  const { isOpen,account,signer,userBalance } = useAuthStore();
  const setIsOpen = useAuthStore((state) => state.setOpen);

  // if(!userBalance && !account){
  //   window.location.href = 
  // }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  return (
    isOpen && 
    <>
      <Transition appear show={isOpen} as={Fragment}>
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
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
  
                  <Dialog.Title
                    as="h3"
                    className="text-3xl mb-8 font-bold text-center  text-black"
                  >
                    Get Your Insurance in a click
                  </Dialog.Title>

                  <Dialog.Title
                    as="h2"
                    className="text-xl mb-2 font-medium text-right  text-black"
                  >
                    Your Balance : {userBalance}TXDC
                  </Dialog.Title>
                  <Form/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
