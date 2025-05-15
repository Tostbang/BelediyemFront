'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { handleLoginAdmin } from '@/app/actions';
import LoginForm from './form';

export default function StaffLoginForm() {
    const router = useRouter();
    const { handleError, handleSuccess } = useNotificationHandler();

    const initialState = {
        email: '',
        password: '',
        success: false,
        message: '',
        errors: [],
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        const result = await handleLoginAdmin(formData);

        if (result.success) {
            handleSuccess(result.message);
            router.push('/admin/dashboard');
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
        <div className="">
            <LoginForm
                formAction={formAction}
                state={state}
                title="Personel Girişi"
                color="purple"
                logo={
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
                }
            />
        </div>
    );
}
