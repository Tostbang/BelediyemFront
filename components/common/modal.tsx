'use client';

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    showCloseButton?: boolean;
};

export default function Modal({
    isOpen,
    onClose,
    children,
    showCloseButton = true,
}: ModalProps) {
    return (
        <>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={onClose}
                    className="relative z-[3000]">
                    {/* Backdrop */}
                    <DialogBackdrop className="fixed inset-0 bg-black/30" />

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0">
                                {showCloseButton && (
                                    <button
                                        onClick={onClose}
                                        className="absolute right-4 top-4 rounded-sm text-gray-400 hover:text-gray-500 cursor-pointer"
                                        aria-label="Close modal">
                                        <IoClose className="size-5" />
                                    </button>
                                )}
                                <div>{children}</div>
                            </DialogPanel>
                        </div>
                    </div>
                </Dialog>
            )}
        </>
    );
}
