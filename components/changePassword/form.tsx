'use client';

import { useState, useEffect } from 'react';
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
import { z } from 'zod';
import { FiCheck, FiX } from 'react-icons/fi';

const passwordSchema = z
    .object({
        newPassword: z
            .string()
            .min(8, { message: 'Şifre en az 8 karakter içermelidir' })
            .regex(/[A-Z]/, {
                message: 'Şifre en az bir büyük harf içermelidir',
            })
            .regex(/[a-z]/, {
                message: 'Şifre en az bir küçük harf içermelidir',
            })
            .regex(/[0-9]/, { message: 'Şifre en az bir sayı içermelidir' })
            .regex(/[^A-Za-z0-9]/, {
                message: 'Şifre en az bir özel karakter içermelidir',
            }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: 'Şifreler eşleşmiyor',
        path: ['confirmPassword'],
    });

// Type for validation errors
type ValidationErrors = {
    minLength: boolean;
    hasUpperCase: boolean;
    hasLowerCase: boolean;
    hasNumber: boolean;
    hasSpecial: boolean;
    passwordsMatch: boolean;
};

export default function ChangePasswordForm({
    type = 'admin',
}: {
    type: RoleType;
}) {
    const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const router = useRouter();
    const { handleError, handleSuccess } = useNotificationHandler();

    const [validations, setValidations] = useState<ValidationErrors>({
        minLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecial: false,
        passwordsMatch: false,
    });
    const [validationError, setValidationError] = useState<string | null>(null);

    // Validate with Zod as user types
    useEffect(() => {
        // Individual validations for UI feedback
        setValidations({
            minLength: newPassword.length >= 8,
            hasUpperCase: /[A-Z]/.test(newPassword),
            hasLowerCase: /[a-z]/.test(newPassword),
            hasNumber: /[0-9]/.test(newPassword),
            hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
            passwordsMatch:
                newPassword === confirmPassword && newPassword !== '',
        });

        // Full Zod validation
        const result = passwordSchema.safeParse({
            newPassword,
            confirmPassword,
        });
        if (!result.success) {
            // Format error message
            const formattedError = result.error.format();
            if (formattedError.newPassword?._errors?.length) {
                setValidationError(formattedError.newPassword._errors[0]);
            } else if (formattedError.confirmPassword?._errors?.length) {
                setValidationError(formattedError.confirmPassword._errors[0]);
            } else if (formattedError._errors?.length) {
                setValidationError(formattedError._errors[0]);
            } else {
                setValidationError(null);
            }
        } else {
            setValidationError(null);
        }
    }, [newPassword, confirmPassword]);

    const initialState = {
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        // Client-side validation before submission
        // Validate before submission as an extra safeguard
        const passwordData = {
            oldPassword: formData.get('oldPassword') as string,
            newPassword: formData.get('newPassword') as string,
            confirmPassword: formData.get('confirmPassword') as string,
        };

        const validation = passwordSchema.safeParse(passwordData);
        if (!validation.success) {
            handleError({
                message: 'Şifre gereksinimleri karşılanmıyor',
                errors: [],
            });
            return {
                ...initialState,
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword,
                confirmPassword: passwordData.confirmPassword,
                success: false,
            };
        }

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

    const [, formAction] = useActionState(clientAction, initialState);

    // Validation indicator component
    const ValidationIndicator = ({ isValid }: { isValid: boolean }) => (
        <span className={`ml-2 ${isValid ? 'text-green-500' : 'text-red-500'}`}>
            {isValid ? <FiCheck /> : <FiX />}
        </span>
    );

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            <form action={formAction} className="flex flex-col gap-6">
                <div className="flex flex-col">
                    <label
                        htmlFor="newPassword"
                        className="text-sm font-semibold text-gray-700 mb-2">
                        Eski Şifre
                    </label>
                    <div className="relative">
                        <input
                            type={showOldPassword ? 'text' : 'password'}
                            id="oldPassword"
                            name="oldPassword"
                            placeholder="Eski Şifre"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            autoComplete="one-time-code"
                            data-form-type="password"
                            suppressHydrationWarning={true}
                            className={`border ${validations.minLength && oldPassword ? 'border-green-500' : 'border-gray-300'} p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            required
                        />
                        <span
                            onClick={() => setShowOldPassword(!showOldPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500">
                            {showOldPassword ? (
                                <AiFillEye size={20} />
                            ) : (
                                <AiFillEyeInvisible size={20} />
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="newPassword"
                        className="text-sm font-semibold text-gray-700 mb-2">
                        Yeni Şifre
                    </label>
                    <div className="relative">
                        <input
                            type={showNewPassword ? 'text' : 'password'}
                            id="newPassword"
                            name="newPassword"
                            placeholder="Yeni Şifre"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            autoComplete="one-time-code"
                            data-form-type="password"
                            suppressHydrationWarning={true}
                            className={`border ${validations.minLength && newPassword ? 'border-green-500' : 'border-gray-300'} p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            required
                        />
                        <span
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500">
                            {showNewPassword ? (
                                <AiFillEye size={20} />
                            ) : (
                                <AiFillEyeInvisible size={20} />
                            )}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-semibold text-gray-700 mb-2">
                        Yeni Şifreyi Tekrar Girin
                    </label>
                    <div className="relative">
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Yeni Şifreyi Tekrar Girin"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            autoComplete="one-time-code"
                            data-form-type="password"
                            suppressHydrationWarning={true}
                            className={`border ${validations.passwordsMatch && confirmPassword ? 'border-green-500' : 'border-gray-300'} p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all`}
                            required
                        />
                        <span
                            onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-500">
                            {showConfirmPassword ? (
                                <AiFillEye size={20} />
                            ) : (
                                <AiFillEyeInvisible size={20} />
                            )}
                        </span>
                    </div>
                    {confirmPassword && (
                        <p
                            className={`text-sm mt-1 ${validations.passwordsMatch ? 'text-green-500' : 'text-red-500'}`}>
                            {validations.passwordsMatch
                                ? 'Şifreler eşleşiyor'
                                : 'Şifreler eşleşmiyor'}
                        </p>
                    )}
                </div>

                {validationError && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                        {validationError}
                    </div>
                )}

                <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800 mt-2">
                    <p className="font-medium mb-2">
                        Güçlü bir şifre için gereksinimler:
                    </p>
                    <ul className="list-none pl-1 space-y-1">
                        <li className="flex items-center">
                            <ValidationIndicator
                                isValid={validations.minLength}
                            />
                            <span
                                className={
                                    validations.minLength
                                        ? 'text-green-700'
                                        : ''
                                }>
                                En az 8 karakter
                            </span>
                        </li>
                        <li className="flex items-center">
                            <ValidationIndicator
                                isValid={validations.hasUpperCase}
                            />
                            <span
                                className={
                                    validations.hasUpperCase
                                        ? 'text-green-700'
                                        : ''
                                }>
                                En az bir büyük harf (A-Z)
                            </span>
                        </li>
                        <li className="flex items-center">
                            <ValidationIndicator
                                isValid={validations.hasLowerCase}
                            />
                            <span
                                className={
                                    validations.hasLowerCase
                                        ? 'text-green-700'
                                        : ''
                                }>
                                En az bir küçük harf (a-z)
                            </span>
                        </li>
                        <li className="flex items-center">
                            <ValidationIndicator
                                isValid={validations.hasNumber}
                            />
                            <span
                                className={
                                    validations.hasNumber
                                        ? 'text-green-700'
                                        : ''
                                }>
                                En az bir sayı (0-9)
                            </span>
                        </li>
                        <li className="flex items-center">
                            <ValidationIndicator
                                isValid={validations.hasSpecial}
                            />
                            <span
                                className={
                                    validations.hasSpecial
                                        ? 'text-green-700'
                                        : ''
                                }>
                                En az bir özel karakter
                            </span>
                        </li>
                    </ul>
                </div>

                <div className="flex justify-end mt-8">
                    <SubmitButton title="Güncelle" />
                </div>
            </form>
        </div>
    );
}
