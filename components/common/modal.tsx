'use client';

import { Dialog } from '@headlessui/react';
import { IoClose } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';

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
        <AnimatePresence>
            {isOpen && (
                <Dialog
                    open={isOpen}
                    onClose={onClose}
                    className="relative z-[3000]">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-gray-500/75"
                    />
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.98, opacity: 0, y: -10 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 30,
                                    duration: 0.4,
                                }}
                                className="relative w-full max-w-lg overflow-hidden rounded-lg bg-white p-6 shadow-xl">
                                {showCloseButton && (
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        onClick={onClose}
                                        className="absolute right-4 top-4 rounded-sm text-gray-400 hover:text-gray-500 cursor-pointer"
                                        aria-label="Close modal">
                                        <IoClose className="size-5" />
                                    </motion.button>
                                )}
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}>
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
