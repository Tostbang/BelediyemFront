import { clearAllCookies } from '@/utils/cookieClient';
import toast from 'react-hot-toast';

type NotificationResult = {
    code?: string;
    success?: boolean;
    message?: string;
    errors?: string | string[];
    status?: string; // Make status optional since not all results will have it
};

export const useNotificationHandler = () => {
    // Simple success handler
    const handleSuccess = (message?: string) => {
        toast.success(message || 'İşlem başarıyla tamamlandı');
    };

    // More complex error handler for different error formats
    const handleError = (result: NotificationResult) => {
        if (typeof result.errors === 'string') {
            toast.error(result.errors);
        } else if (Array.isArray(result.errors) && result.errors.length > 0) {
            result.errors.forEach((error) => toast.error(error));
        } else if (result.message) {
            toast.error(result.message);
        } else {
            toast.error('Bir hata oluştu');
        }

        if (result.status === 'UNAUTHORIZED') {
            setTimeout(() => {
                clearAllCookies();
            }, 1000);

        }
    };

    // Combined handler for API responses
    const handleResult = (result: NotificationResult) => {
        if (result.success || result.code === '200') {
            handleSuccess(result.message);
        } else {
            handleError(result);
        }
    };

    return { handleSuccess, handleError, handleResult };
};

