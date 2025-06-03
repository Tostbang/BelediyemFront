'use client';

import React, { useActionState } from 'react';
import Modal from '../common/modal';
import SubmitButton from '../common/submitButton';
import { sendMessage } from '@/app/actions';
import { RoleType } from '@/types';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';

type MessageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    type: RoleType;
};

export default function MessageModal({
    isOpen,
    onClose,
    id,
    type,
}: MessageModalProps) {
    const handleCancel = () => {
        onClose();
    };

    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const initialState = {
        content: '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (id) {
            formData.append('id', id);
        }

        let actionFunction;

        switch (type) {
            case 'municipality':
                actionFunction = sendMessage;
                break;
            default:
                return {
                    success: false,
                    message: 'Unsupported role type',
                    content: '',
                    status: false,
                };
        }
        const result = await actionFunction(formData);

        if (result.success) {
            handleSuccess(result.message);
            handleCancel();
            router.refresh();
        } else {
            handleError(result);
            handleCancel();
        }

        return {
            ...result,
            content: formData.get('content') as string,
        };
    };

    const [, formAction] = useActionState(clientAction, initialState);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <form action={formAction}>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Mesaj Gönder
                    </h3>
                    <div>
                        <textarea
                            rows={3}
                            id="reply-text"
                            name="content"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 min-h-32 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            placeholder="Mesajınızı buraya yazın..."
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
