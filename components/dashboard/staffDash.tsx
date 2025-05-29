'use client';
import React from 'react';
import StatsCard from '@/components/common/statatsCard';
import {
    ClipboardIcon,
    ClockIcon,
    EyeIcon,
    PauseIcon,
    TickIcon,
    XIcon,
} from '@/components/icons';
import { BreadcrumbItem, DashboardStatisticsStaff } from '@/types';
import ComplaintChart from './complaintChart';
import Breadcrumb from '../common/breadCrumb';

export default function DashboardStaff({
    dashboard,
    breadcrumb,
}: {
    dashboard: DashboardStatisticsStaff;
    breadcrumb: BreadcrumbItem[];
}) {
    const cardsData = [
        {
            title: 'Gelen Şikayet/Talep',
            value: dashboard?.totalComplaints || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <div className="h-6 w-6 flex items-center justify-center">
                        <ClipboardIcon />
                    </div>
                </div>
            ),
        },
        {
            title: 'Çözülen Sorunlar',
            value: dashboard?.resolvedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <div className="h-6 w-6 flex items-center justify-center">
                        <TickIcon />
                    </div>
                </div>
            ),
        },
        {
            title: 'Bekleyen Sorunlar',
            value: dashboard?.pendingCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    <div className="h-6 w-6 flex items-center justify-center">
                        <ClockIcon />
                    </div>
                </div>
            ),
        },
        {
            title: 'İncelenen Şikayet/Talepler',
            value: dashboard?.underReviewCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                    <div className="h-6 w-6 flex items-center justify-center">
                        <EyeIcon />
                    </div>
                </div>
            ),
        },
        {
            title: 'Başlayan Şikayet/Talepler',
            value: dashboard?.startedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                    <div className="h-6 w-6 flex items-center justify-center">
                        <PauseIcon />
                    </div>
                </div>
            ),
        },
        {
            title: 'Reddedilen Şikayet/Talepler',
            value: dashboard?.rejectedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <div className="h-6 w-6 flex items-center justify-center">
                        <XIcon />
                    </div>
                </div>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-full">
                    {cardsData.map((card, index) => (
                        <StatsCard
                            key={index}
                            title={card.title}
                            value={card.value}
                            icon={card.icon}
                        />
                    ))}
                </div>

                <ComplaintChart
                    monthlyStatistics={dashboard.monthlyStatistics || []}
                />
            </div>
        </>
    );
}
