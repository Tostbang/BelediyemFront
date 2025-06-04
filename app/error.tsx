'use client';
import { useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
            <div className="mb-8">
                <FaExclamationTriangle className="text-orange-500 text-6xl" />
            </div>
            <h1 className="text-9xl font-bold mb-4 text-orange-500">500</h1>
            <h2 className="text-4xl font-semibold mb-4">Bir Hata Oluştu</h2>
            <p className="text-gray-600 text-lg mb-8">
                Üzgünüz, bir şeyler yanlış gitti.
            </p>
            <button
                onClick={() => reset()}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-300 cursor-pointer">
                Tekrar Dene
            </button>
        </div>
    );
}
