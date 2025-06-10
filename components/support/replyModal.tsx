'use client';

import React, { useState } from 'react';
import Modal from '../common/modal';
import SubmitButton from '../common/submitButton';
import { answerToSupportMuni, answerToSupportMuniAdmin } from '@/app/actions';
import { RoleType } from '@/types';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';

type ReplyModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    type: RoleType;
};

export default function ReplyModal({
    isOpen,
    onClose,
    id,
    type,
}: ReplyModalProps) {
    const [replyText, setReplyText] = useState('');

    const handleCancel = () => {
        setReplyText('');
        onClose();
    };

    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleConfirm = async () => {
        if (id) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await answerToSupportMuni(id, replyText);
                    break;
                case 'admin-muni':
                    result = await answerToSupportMuniAdmin(id, replyText);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Unsupported role type',
                    };
            }

            if (result.success) {
                handleSuccess(result.message);
                handleCancel();
                router.refresh();
            } else {
                handleError(result);
                handleCancel();
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <form action={handleConfirm}>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Destek Talebi Yanıtla
                    </h3>
                    <div>
                        <textarea
                            id="reply-text"
                            className="w-full rounded-md border border-gray-300 p-2 min-h-32 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Yanıtınızı buraya yazın..."
                        />
                    </div>
                    <div className="flex justify-end gap-2 mt-2">
                        <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={handleCancel}>
                            İptal
                        </button>
                        <SubmitButton title="Gönder" />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
