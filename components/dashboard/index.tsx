'use client';
import React from 'react';
import StatsCard from '@/components/common/statatsCard';
import {
    ClipboardIcon,
    ClockIcon,
    DownloadIcon,
    EyeIcon,
    PauseIcon,
    TickIcon,
    XIcon,
} from '@/components/icons';
import {
    BreadcrumbItem,
    ComplaintReports,
    DashboardStatisticsMuni,
    DepartmentStatistics,
    ReportsMuniResponse,
} from '@/types';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';
import { departmans } from '@/data/departmans';
import { formatDate } from '@/utils';
import ComplaintChart from './complaintChart';
import Breadcrumb from '../common/breadCrumb';

export default function DashboardMuni({
    dashboard,
    reports,
    breadcrumb,
}: {
    dashboard: DashboardStatisticsMuni;
    reports?: ReportsMuniResponse;
    breadcrumb: BreadcrumbItem[];
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination();

    const handleDownload = (record: ComplaintReports) => {
        try {
            const link = document.createElement('a');
            link.href = record.fileContent;
            link.target = '_blank';
            link.setAttribute('download', record.fileName);

            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
        } catch (error) {
            console.error('Download failed:', error);
            alert('Dosya indirme işlemi başarısız oldu.');
        }
    };

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
            title: 'id',
            dataIndex: 'id',
            width: 100,
            fixed: 'left' as const,
        },
        {
            title: 'Dosya Adı',
            dataIndex: 'fileName',
            width: 180,
        },
        {
            title: 'Oluşturulma Tarihi',
            dataIndex: 'createdDate',
            width: 180,
            render: (date: string) => formatDate(date),
        },
        {
            title: 'İndir',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: ComplaintReports) => (
                <div>
                    <button
                        onClick={() => handleDownload(record)}
                        className="text-blue-500 hover:text-blue-700 cursor-pointer w-6 h-6">
                        <DownloadIcon />
                    </button>
                </div>
            ),
        },
    ];

    const columns2 = [
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

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
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

                    <ComplaintChart
                        monthlyStatistics={dashboard.monthlyStatistics || []}
                    />

                    <div className="w-full overflow-hidden mt-6 bg-white rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Şikayet Rapor Dosyaları
                        </h2>
                        <div className="overflow-x-auto">
                            {reports ? (
                                <DynamicTable<ComplaintReports>
                                    data={reports.complaintReports || []}
                                    columns={columns}
                                    rowKey="id"
                                    showControls={false}
                                    pagination={{
                                        pageSize: pageSize,
                                        current: pageNumber,
                                        total: reports.totalCount || 0,
                                        onChange: handlePageChange,
                                        onShowSizeChange: handlePageSizeChange,
                                        responsive: true,
                                        size: 'default',
                                    }}
                                />
                            ) : (
                                <div className="text-center py-4">
                                    Veri yükleniyor...
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-full overflow-hidden mt-6 bg-white rounded-lg p-6">
                        <h2 className="text-xl font-semibold mb-4">
                            Departman Bazlı Şikayet Dağılımı
                        </h2>
                        <div className="overflow-x-auto">
                            <DynamicTable<DepartmentStatistics>
                                data={dashboard.departmentStatistics}
                                columns={columns2}
                                rowKey="departmentName"
                                showControls={false}
                                pagination={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
