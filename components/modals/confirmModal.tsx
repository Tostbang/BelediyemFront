'use client';

import { FC } from 'react';
import Modal from '../common/modal';
import SubmitButton from '../common/submitButton';

interface ConfirmModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    onConfirm: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    onConfirm,
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <form action={handleConfirm} className="flex flex-col gap-4">
                <h3 className="text-lg font-medium leading-6 text-gray-900 mb-2">
                    {title}
                </h3>
                <div className="mt-2">
                    <p className="text-sm text-gray-500">{message}</p>
                </div>

                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                        onClick={onClose}>
                        İptal
                    </button>
                    <SubmitButton title="Onayla" />
                </div>
            </form>
        </Modal>
    );
};

export default ConfirmModal;
