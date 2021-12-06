import React, { useRef } from 'react';
import { Dialog } from '@headlessui/react';
import XIcon from '@heroicons/react/solid/XIcon';

type Props = {
  title: string;
  isOpen: boolean;
  handleIsOpen: (value: boolean) => void;
  children: JSX.Element;
};

const Modal = ({ title, isOpen, handleIsOpen, children }: Props) => {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleIsOpen(false)}
      className="fixed z-10 inset-0 overflow-y-auto flex justify-center items-center"
      initialFocus={cancelButtonRef}
    >
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div className="flex opacity-100 flex-1 flex-col w-full rounded-xl bg-white md:p-15 py-15 px-3 max-w-xl z-20">
        <div className="flex flex-1 flex-row items-center justify-between w-full mb-8 pt-2">
          <Dialog.Title className="text-black font-sen-bold text-2xl">{title}</Dialog.Title>
          <button ref={cancelButtonRef}>
            <XIcon onClick={() => handleIsOpen(false)} className="cursor-pointer w-5 h-5 text-gray-500" />
          </button>
        </div>
        {children}
      </div>
    </Dialog>
  );
};

export default Modal;
