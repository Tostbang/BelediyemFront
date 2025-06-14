import React from 'react';

type AlertType = 'error' | 'warning' | 'success' | 'info';

interface AlertMessageProps {
    message: string;
    type?: AlertType;
    title?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
    message,
    type = 'error',
    title,
}) => {
    const styles = {
        error: {
            border: 'border-red-500',
            bg: 'bg-red-50',
            iconColor: 'text-red-500',
            titleColor: 'text-red-800',
            messageColor: 'text-red-700',
        },
        warning: {
            border: 'border-yellow-500',
            bg: 'bg-yellow-50',
            iconColor: 'text-yellow-500',
            titleColor: 'text-yellow-800',
            messageColor: 'text-yellow-700',
        },
        success: {
            border: 'border-green-500',
            bg: 'bg-green-50',
            iconColor: 'text-green-500',
            titleColor: 'text-green-800',
            messageColor: 'text-green-700',
        },
        info: {
            border: 'border-blue-500',
            bg: 'bg-blue-50',
            iconColor: 'text-blue-500',
            titleColor: 'text-blue-800',
            messageColor: 'text-blue-700',
        },
    };

    const currentStyle = styles[type];
    const defaultTitle = {
        error: 'Hata',
        warning: 'Uyarı',
        success: 'Başarılı',
        info: 'Bilgi',
    };

    const icons = {
        error: (
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 001.414-1.414L11.414 10l1.293-1.293a1 1 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
            />
        ),
        warning: (
            <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
            />
        ),
        success: (
            <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
            />
        ),
        info: (
            <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
            />
        ),
    };

    return (
        <div
            className={`mb-4 p-4 mt-16 border-l-4 ${currentStyle.border} ${currentStyle.bg} rounded-md `}>
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg
                        className={`h-5 w-5 ${currentStyle.iconColor}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        {icons[type]}
                    </svg>
                </div>
                <div className="ml-3">
                    <h3
                        className={`text-sm font-medium ${currentStyle.titleColor}`}>
                        {title || defaultTitle[type]}
                    </h3>
                    <div
                        className={`mt-1 text-sm ${currentStyle.messageColor}`}>
                        {message}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertMessage;
