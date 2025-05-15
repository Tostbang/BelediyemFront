'use client';

import { useActionState } from 'react';
import { useRouter } from 'next/navigation';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { handleLoginAdmin } from '@/app/actions';
import LoginForm from './form';

export default function AdminLoginForm() {
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
            <LoginForm formAction={formAction} state={state} />
        </div>
    );
}
