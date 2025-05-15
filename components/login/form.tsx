'use client';

import { ReactElement, useState } from 'react';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import {
    handleLoginAdmin,
    handleLoginStaff,
    handleLoginMunicipality,
} from '@/app/actions';
import ForgetPasswordModal from '@/components/modals/forgetPasswordModal';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../common/submitButton';

type LoginType = 'admin' | 'municipality' | 'staff';

export default function LoginForm({
    type = 'admin',
    customTitle,
    customLogo,
    customColor,
}: {
    type?: LoginType;
    customTitle?: string;
    customLogo?: ReactElement;
    customColor?: string;
}) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showForgotPassword, setShowForgotPassword] =
        useState<boolean>(false);
    const router = useRouter();
    const { handleError, handleSuccess } = useNotificationHandler();

    // Define type-specific properties
    let title: string;
    let logo: ReactElement;
    let color: string;

    // Set properties based on type
    switch (type) {
        case 'admin':
            title = customTitle || 'Yönetici Girişi';
            color = customColor || 'blue';
            logo = customLogo || (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            );
            break;
        case 'municipality':
            title = customTitle || 'Belediye Girişi';
            color = customColor || 'green';
            logo = customLogo || (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                </svg>
            );
            break;
        case 'staff':
            title = customTitle || 'Personel Girişi';
            color = customColor || 'purple';
            logo = customLogo || (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 mx-auto text-purple-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                </svg>
            );
            break;
        default:
            title = customTitle || 'Giriş Yap';
            color = customColor || 'blue';
            logo = customLogo || <div></div>;
    }

    const initialState = {
        email: '',
        password: '',
        success: false,
        message: '',
        errors: [],
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        // Use different login handlers based on type
        let result;
        let redirectPath;

        switch (type) {
            case 'admin':
                result = await handleLoginAdmin(formData);
                redirectPath = '/admin/dashboard';
                break;
            case 'municipality':
                result = await handleLoginMunicipality(formData);
                redirectPath = '/municipality/dashboard';
                break;
            case 'staff':
                result = await handleLoginStaff(formData);
                redirectPath = '/staff/dashboard';
                break;
            default:
                result = await handleLoginAdmin(formData);
                redirectPath = '/admin/dashboard';
        }

        if (result.success) {
            handleSuccess(result.message);
            router.push(redirectPath);
            return { ...result, email: '', password: '' };
        } else {
            handleError(result);
            return {
                ...result,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            };
        }
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <div className="max-w-lg lg:w-[460px]  mx-auto bg-white rounded-lg shadow-md p-8">
            <div className="flex items-center mb-6 gap-2">
                <div>{logo}</div>
                <h1 className="text-xl font-medium text-gray-800">{title}</h1>
            </div>

            <h2 className="text-center text-lg font-medium text-gray-900 mb-4">
                Giriş Yap
            </h2>

            <form action={formAction} className="space-y-5">
                <div className="flex flex-col">
                    <label
                        htmlFor="email"
                        className="text-sm text-gray-600 mb-1">
                        E-posta
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="e-posta"
                        defaultValue={state.email}
                        className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none"
                        required
                    />
                </div>

                <div className="flex flex-col relative">
                    <label
                        htmlFor="password"
                        className="text-sm text-gray-600 mb-1">
                        Şifre
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            name="password"
                            placeholder="şifre"
                            defaultValue={state.password}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none pr-10"
                            required
                        />
                        <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                                <AiFillEyeInvisible />
                            ) : (
                                <AiFillEye />
                            )}
                        </button>
                    </div>
                </div>

                <div>
                    <button
                        type="button"
                        className="text-sm hover:underline cursor-pointer"
                        onClick={() => setShowForgotPassword(true)}>
                        Şifremi Unuttum
                    </button>
                </div>
                <SubmitButton
                    title="Giriş Yap"
                    className={`w-full bg-${color}-600 text-white py-3 rounded-lg hover:bg-${color}-700 transition-all text-center cursor-pointer`}
                />
            </form>

            {showForgotPassword && (
                <ForgetPasswordModal
                    open={showForgotPassword}
                    onClose={() => setShowForgotPassword(false)}
                />
            )}
        </div>
    );
}
