'use client';

import { ReactElement, useState } from 'react';
import ForgetPasswordModal from '@/components/modals/forgetPasswordModal';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../common/submitButton';

export default function LoginForm({
    formAction,
    state,
    title,
    logo,
    color = 'blue',
}: {
    formAction: (payload: FormData) => void;
    state: { email: string; password: string };
    title?: string;
    logo?: ReactElement;
    color?: string;
}) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showForgotPassword, setShowForgotPassword] =
        useState<boolean>(false);

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
