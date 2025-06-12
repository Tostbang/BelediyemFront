'use client';
import React, { useState } from 'react';
import { Ratings, RatingResponse, BreadcrumbItem, RoleType } from '@/types';
import ConfirmModal from '../modals/confirmModal';
import { approvedRatingMuni, approvedRatingMuniAdmin } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';
import { Rate } from 'antd';
import Breadcrumb from '../common/breadCrumb';
import StatusBadge from '../common/StatusBadge';

export default function RatingList({
    ratings,
    breadcrumb,
    type,
}: {
    ratings: RatingResponse;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination();
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleAprroveRating = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            let result;

            switch (type) {
                case 'municipality':
                    result = await approvedRatingMuni(selectedItem);
                    break;
                case 'admin-muni':
                    result = await approvedRatingMuniAdmin(selectedItem);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Geçersiz işlem türü',
                    };
            }

            if (result.success) {
                handleSuccess(result.message);
                setModal(false);
                router.refresh();
            } else {
                handleError(result);
                setModal(false);
            }
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 180,
        },
        {
            title: 'Kullanıcı Adı',
            dataIndex: 'userName',
            fixed: 'left' as const,
            width: 180,
        },
        {
            title: 'Şikayet Başlığı',
            dataIndex: 'complaintTitle',
            width: 180,
        },
        {
            title: 'Puan',
            dataIndex: 'rating',
            width: 180,
            render: (value: number) => <Rate defaultValue={value} disabled />,
        },
        {
            title: 'Yorum',
            dataIndex: 'complaintDescription',
            width: 180,
        },
        {
            title: 'Düzenleme Tarihi',
            dataIndex: 'modifiedDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            width: 180,
            render: (text: boolean) => <StatusBadge status={text} />,
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: Ratings) => (
                <div>
                    <button
                        onClick={() =>
                            handleAprroveRating(record.id.toString())
                        }
                        className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        Onayla
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden">
                    <DynamicTable<Ratings>
                        data={ratings.ratings}
                        columns={columns}
                        rowKey="id"
                        showControls={false}
                        pagination={{
                            pageSize: pageSize,
                            current: pageNumber,
                            total: ratings.totalCount || 0,
                            onChange: handlePageChange,
                            onShowSizeChange: handlePageSizeChange,
                            responsive: true,
                            size: 'default',
                        }}
                    />
                </div>
                <ConfirmModal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                    title="Değerlendirmeyi Onayla"
                    message="Bu değerlendirmeyi onaylamak istediğinize emin misiniz?"
                    onConfirm={handleConfirm}
                />
            </div>
        </>
    );
}
