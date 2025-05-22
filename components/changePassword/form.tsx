'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import {
    changePasswordMun,
    changePasswordAdmin,
    changePasswordStaff,
} from '@/app/actions';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../common/submitButton';
import { RoleType } from '@/types';

export default function ChangePasswordForm({
    type = 'admin',
}: {
    type: RoleType;
}) {
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const router = useRouter();
    const { handleError, handleSuccess } = useNotificationHandler();

    const initialState = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        let result;
        let redirectPath;

        switch (type) {
            case 'admin':
                result = await changePasswordAdmin(formData);
                redirectPath = '/admin/settings/change-password';
                break;
            case 'municipality':
                result = await changePasswordMun(formData);
                redirectPath = '/municipality/settings/change-password';
                break;
            case 'staff':
                result = await changePasswordStaff(formData);
                redirectPath = '/staff/settings/change-password';
                break;
        }

        if (result.success) {
            handleSuccess(result.message);
            router.push(redirectPath);
            return {
                ...result,
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
            };
        } else {
            handleError(result);
            return {
                ...result,
                oldPassword: formData.get('oldPassword') as string,
                newPassword: formData.get('newPassword') as string,
                confirmPassword: formData.get('confirmPassword') as string,
            };
        }
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            <form action={formAction} className="space-y-5">
                <div className="flex flex-col relative">
                    <label
                        htmlFor="oldPassword"
                        className="text-sm text-gray-600 mb-1">
                        Eski Şifre
                    </label>
                    <div className="relative">
                        <input
                            type={showOldPassword ? 'text' : 'password'}
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="eski şifre"
                            defaultValue={state.oldPassword}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() =>
                                setShowOldPassword(!showOldPassword)
                            }>
                            {showOldPassword ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col relative">
                    <label
                        htmlFor="newPassword"
                        className="text-sm text-gray-600 mb-1">
                        Yeni Şifre
                    </label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            placeholder="yeni şifre"
                            defaultValue={state.newPassword}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() =>
                                setShowNewPassword(!showNewPassword)
                            }>
                            {showNewPassword ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex flex-col relative">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm text-gray-600 mb-1">
                        Yeni Şifre Tekrar
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="yeni şifre tekrar"
                            defaultValue={state.confirmPassword}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }>
                            {showConfirmPassword ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </button>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <SubmitButton title="Güncelle" />
                </div>
            </form>
        </div>
    );
}
