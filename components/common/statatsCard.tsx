'use client';

import { ReactElement } from 'react';

export default function StatsCard({
    title,
    value,
    icon,
    bgColor = 'bg-white',
}: {
    title: string;
    value: string | number;
    icon: ReactElement;
    bgColor?: string;
}) {
    return (
        <div className={`w-full p-6 rounded-lg shadow-sm ${bgColor}`}>
            <div className="flex justify-between items-center">
                <div>
                    <h3 className="text-sm text-gray-600 font-medium">{title}</h3>
                    <p className="text-2xl font-semibold mt-2">{value}</p>
                </div>
                <div className="flex items-center justify-center">
                    {icon}
                </div>
            </div>
        </div>
    );
}
