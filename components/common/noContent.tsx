'use client';
import React from 'react';

interface NoContentProps {
    message?: string;
    icon?: React.ReactNode;
    className?: string;
}

export default function NoContent({
    message = 'İçerik Bulunamadı',
    icon,
    className = '',
}: NoContentProps) {
    return (
        <div
            className={`flex flex-col items-center justify-center py-12 px-4 ${className}`}>
            <div className="bg-gray-50 rounded-full p-6 mb-4">
                {icon || (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="48"
                        height="48"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400">
                        <path d="M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2" />
                        <circle cx="12" cy="14" r="3" />
                        <path d="M17 9v9" />
                        <path d="M14 13h6" />
                    </svg>
                )}
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                {message}
            </h3>
            <p className="text-sm text-gray-500 text-center">
                Aradığınız içerik şu anda mevcut değil.
            </p>
        </div>
    );
}
