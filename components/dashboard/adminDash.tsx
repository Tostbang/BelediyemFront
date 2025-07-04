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
import {
    BreadcrumbItem,
    DashboardStatisticsAdmin,
    DepartmentStatistics,
    TopComplaintCategories,
    TopMunicipalities,
} from '@/types';
import DynamicTable from '../dynamic/table';
import { departmans } from '@/data/departmans';
import ComplaintChart from './complaintChart';
import Breadcrumb from '../common/breadCrumb';

export default function DashboardAdmin({
    dashboard,
    breadcrumb,
}: {
    dashboard: DashboardStatisticsAdmin | null;
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

    const columns = [
        {
            title: 'Departman',
            dataIndex: 'departmentName',
            width: 100,
            fixed: 'left' as const,
            render: (value: number) =>
                departmans.find((item) => item.id === value)?.name,
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

    const column2 = [
        {
            title: 'Belediye Adı',
            dataIndex: 'municipalityName',
            width: 100,
            fixed: 'left' as const,
        },
        {
            title: 'Şikayet Sayısı',
            dataIndex: 'complaintCount',
            width: 180,
        },
    ];

    const column3 = [
        {
            title: 'Kategori Adı',
            dataIndex: 'categoryName',
            width: 100,
            fixed: 'left' as const,
        },
        {
            title: 'Şikayet Sayısı',
            dataIndex: 'complaintCount',
            width: 180,
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
                    monthlyStatistics={dashboard?.monthlyStatistics || []}
                />

                <div className="w-full overflow-hidden mt-6 bg-white rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Departman Bazlı Şikayet Dağılımı
                    </h2>
                    <div className="overflow-x-auto">
                        <DynamicTable<DepartmentStatistics>
                            data={dashboard?.departmentStatistics || []}
                            columns={columns}
                            rowKey="departmentName"
                            showControls={false}
                            pagination={false}
                        />
                    </div>
                </div>
                <div className="w-full overflow-hidden mt-6 bg-white rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        En Çok Şikayet Gelen Belediyeler
                    </h2>
                    <div className="overflow-x-auto">
                        <DynamicTable<TopMunicipalities>
                            data={dashboard?.topMunicipalities || []}
                            columns={column2}
                            rowKey="municipalityName"
                            showControls={false}
                            pagination={false}
                        />
                    </div>
                </div>

                <div className="w-full overflow-hidden mt-6 bg-white rounded-lg p-6">
                    <h2 className="text-xl font-semibold mb-4">
                        En Çok Şikayet Gelen Kategoriler
                    </h2>
                    <div className="overflow-x-auto">
                        <DynamicTable<TopComplaintCategories>
                            data={dashboard?.topComplaintCategories || []}
                            columns={column3}
                            rowKey="categoryName"
                            showControls={false}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
