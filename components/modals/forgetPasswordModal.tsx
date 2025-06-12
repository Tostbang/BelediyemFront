'use client';
// import { handleForgetPassword } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import Modal from '@/components/common/modal';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import {
    handleForgetPasswordMun,
    handleForgetPasswordStaff,
} from '@/app/actions';
import { RoleType } from '@/types';

export default function ForgetPasswordModal({
    open,
    onClose,
    type,
}: {
    open: boolean;
    onClose: () => void;
    type: RoleType;
}) {
    const { handleError, handleSuccess } = useNotificationHandler();

    const initialState = {
        email: '',
        success: false,
        message: '',
        errors: [],
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        let result;

        switch (type) {
            case 'municipality':
                result = await handleForgetPasswordMun(formData);
                break;
            case 'staff':
                result = await handleForgetPasswordStaff(formData);
                break;
            default:
                result = {
                    success: false,
                    message: 'Geçersiz işlem türü',
                };
        }

        if (result.success) {
            handleSuccess(result.message);
            onClose();
            return { ...result, email: '' };
        } else {
            handleError(result);
            return {
                ...result,
                email: formData.get('email') as string,
            };
        }
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <Modal isOpen={open} onClose={onClose}>
            <h2 className="text-xl font-bold mb-4">Şifre Sıfırlama</h2>
            <p className="mb-4">
                Lütfen e-posta adresinizi girin. Şifre sıfırlama bağlantısı
                gönderilecektir.
            </p>
            <form action={formAction} className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-sm font-semibold text-gray-600 mb-2">
                        E-posta
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        defaultValue={state.email}
                        placeholder="E-posta"
                        className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                    />
                </div>
                <div className="flex justify-between mt-4">
                    <button
                        type="button"
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
                        onClick={onClose}>
                        İptal
                    </button>
                    <SubmitButton title="Gönder" />
                </div>
            </form>
        </Modal>
    );
}
