'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { handleLoginAdmin } from '@/app/actions';
import LoginForm from './form';

export default function MunicipalityLoginForm() {
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
                title="Belediye Girişi"
                color="green"
                logo={
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
                }
            />
        </div>
    );
}
