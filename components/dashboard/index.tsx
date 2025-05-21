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
    ComplaintReports,
    DashboardStatisticsMuni,
    DepartmentStatistics,
    ReportsMuniResponse,
} from '@/types';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';
import { departmans } from '@/data/departmans';
import { formatDate } from '@/utils';

export default function DashboardMuni({
    dashboard,
    reports,
}: {
    dashboard: DashboardStatisticsMuni;
    reports?: ReportsMuniResponse;
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
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
                // <Dropdown
                //     menu={{
                //         items: [
                //             {
                //                 key: 'edit',
                //                 label: (
                //                     <Link href={`/admin/blog/${record.id}`}>
                //                         Düzenle / Görüntüle
                //                     </Link>
                //                 ),
                //             },
                //             {
                //                 key: 'delete',
                //                 label: 'Sil',
                //                 danger: true,
                //                 onClick: () =>
                //                     handleDeleteClick(record.id.toString()),
                //             },
                //         ],
                //     }}>
                //     <a onClick={(e) => e.preventDefault()} className="text-2xl">
                //         <MoreOutlined />
                //     </a>
                // </Dropdown>
                <div>
                    <a
                        href={`/municipality/download/${record.id}`}
                        target="_blank"
                        rel="noopener noreferrer">
                        <button className="text-blue-500 hover:text-blue-700">
                            <ClipboardIcon />
                        </button>
                    </a>
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
                            <div className="text-center py-4">Veri yükleniyor...</div>
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
    );
}
