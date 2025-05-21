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
import { DashboardStatisticsMuni, MonthlyStatistics } from '@/types';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';

export default function DashboardMuni({
    dashboard,
}: {
    dashboard: DashboardStatisticsMuni;
}) {
    const { currentPage, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination();

    const cardsData = [
        {
            title: 'Gelen Şikayet/Talep',
            value: dashboard?.totalComplaints || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <ClipboardIcon />
                </div>
            ),
        },
        {
            title: 'Çözülen Sorunlar',
            value: dashboard?.resolvedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                    <TickIcon />
                </div>
            ),
        },
        {
            title: 'Bekleyen Sorunlar',
            value: dashboard?.pendingCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    <ClockIcon />
                </div>
            ),
        },
        {
            title: 'İncelenen Şikayet/Talepler',
            value: dashboard?.underReviewCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
                    <EyeIcon />
                </div>
            ),
        },
        {
            title: 'Başlayan Şikayet/Talepler',
            value: dashboard?.startedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-500">
                    <PauseIcon />
                </div>
            ),
        },
        {
            title: 'Reddedilen Şikayet/Talepler',
            value: dashboard?.rejectedCount || '0',
            icon: (
                <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <XIcon />
                </div>
            ),
        },
    ];

    const columns = [
        {
            title: 'Ay',
            dataIndex: 'month',
            width: 100,
        },
        {
            title: 'Toplam Şikayet',
            dataIndex: 'totalComplaints',
            width: 180,
        },
        {
            title: 'Çözüldü',
            dataIndex: 'resolvedCount',
            width: 180,
        },
        {
            title: 'Bekleniyor',
            dataIndex: 'pendingCount',
            width: 180,
        },
        {
            title: 'İnceleniyor',
            dataIndex: 'underReviewCount',
            width: 180,
        },
        {
            title: 'Başladı',
            dataIndex: 'startedCount',
            width: 180,
        },
        {
            title: 'Reddedildi',
            dataIndex: 'rejectedCount',
            width: 180,
        },
    ];

    return (
        <div>
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

                <div className="w-full overflow-hidden mt-6 bg-white rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Aylık Dağılım
                    </h2>
                    <div className="overflow-x-auto">
                        <DynamicTable<MonthlyStatistics>
                            data={dashboard.monthlyStatistics.map((stat) => ({
                                ...stat,
                                department: 'Alt Yapı',
                                createdAt: '12.09.2019 - 12.53',
                                lastDownloadDate: '12.09.2019 - 12.53',
                            }))}
                            columns={columns}
                            rowKey="month"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: currentPage,
                                total: dashboard.monthlyStatistics.length,
                                onChange: handlePageChange,
                                onShowSizeChange: handlePageSizeChange,
                                responsive: true,
                                size: 'default',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
