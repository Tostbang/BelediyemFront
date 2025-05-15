'use client';

import { useState } from 'react';
import ForgetPasswordModal from '@/components/modals/forgetPasswordModal';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import SubmitButton from '../common/submitButton';

export default function LoginForm({
    formAction,
    state,
}: {
    formAction: (payload: FormData) => void;
    state: { email: string; password: string };
}) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showForgotPassword, setShowForgotPassword] =
        useState<boolean>(false);

    return (
        <div className="">
            <form action={formAction}>
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
                        placeholder="E-posta"
                        defaultValue={state.email}
                        className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                    />
                </div>
                <div className="flex flex-col relative">
                    <label
                        htmlFor="password"
                        className="text-sm font-semibold text-gray-600 mb-2">
                        Şifre
                    </label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Şifre"
                        defaultValue={state.password}
                        className="border p-4 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        required
                    />
                    <button
                        type="button"
                        className="absolute right-3 bottom-4 text-gray-600 text-2xl"
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                </div>

                <div className="text-right -mt-4">
                    <button
                        type="button"
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => setShowForgotPassword(true)}>
                        Şifremi Unuttum
                    </button>
                </div>
                <SubmitButton title="Giriş Yap" />
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
