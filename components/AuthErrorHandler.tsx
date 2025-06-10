'use client';

import { useEffect } from 'react';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { clearAllCookies } from '@/utils/cookieClient';

interface AuthErrorHandlerProps {
    error?: {
        success: boolean;
        errors?: string;
        status?: string;
    };
}

export default function AuthErrorHandler({ error }: AuthErrorHandlerProps) {
    const { handleError } = useNotificationHandler();
    const router = useRouter();

    useEffect(() => {
        if (error && !error.success) {
            handleError(error);
            if (error.status === 'UNAUTHORIZED') {
                setTimeout(() => {
                    clearAllCookies();
                }, 1000);
            }
        }
    }, [error, handleError, router]);

    return null;
}
