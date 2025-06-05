import React from 'react';

export default function AdminMuniLoading({ title }: { title?: string }) {
    return (
        <div className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm z-50 flex justify-center items-center transition-all duration-300 ease-in-out">
            <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center transform scale-up">
                <div className="w-20 h-20 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin mb-4"></div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {title}
                </h2>
                <p className="text-gray-600">Lütfen bekleyiniz...</p>
            </div>
        </div>
    );
}
