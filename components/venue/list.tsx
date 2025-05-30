'use client';
import React, { useState } from 'react';
import { BreadcrumbItem, RoleType, Venue, VenueResponse } from '@/types';
import ConfirmModal from '../modals/confirmModal';
import { deleteVenueMuni } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LinkButton from '../common/LinkButton';
import Breadcrumb from '../common/breadCrumb';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';
import ImageWithSkeleton from '../common/imageSkeleton';
import { formatDateTime } from '@/utils';
import StatusBadge from '../common/StatusBadge';
import DynamicDropdown from '../common/DynamicDropdown';
import VenueDetail from './detail';

export default function VenueList({
    venues,
    type,
    breadcrumb,
}: {
    venues: VenueResponse;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination({});
    const [modal, setModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleDeleteClick = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleDetailClick = (id: string) => {
        setSelectedItem(id);
        setDetailsModal(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await deleteVenueMuni(selectedItem);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Unsupported role type',
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

    let url;
    switch (type) {
        case 'municipality':
            url = '/municipality/venue';
            break;
        default:
            url = '';
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Görsel',
            dataIndex: 'image',
            width: 180,
            render: (value: string) => {
                return value ? (
                    <ImageWithSkeleton
                        src={value}
                        alt="Slayt Görseli"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full rounded-full"
                    />
                ) : (
                    <div className="w-20 flex items-center justify-center h-full bg-gray-100 text-gray-500 rounded-full">
                        <span className="text-2xl">Görsel Yok</span>
                    </div>
                );
            },
        },
        {
            title: 'Başlık',
            dataIndex: 'title',
            width: 180,
        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
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
            render: (_: unknown, record: Venue) => {
                const dropdownItems = [
                    {
                        key: 'detail',
                        label: 'Detay',
                        onClick: () => handleDetailClick(record.id.toString()),
                    },
                    {
                        key: 'edit',
                        label: (
                            <Link href={`/municipality/venue/${record.id}`}>
                                Düzenle
                            </Link>
                        ),
                    },
                    {
                        key: 'delete',
                        label: 'Sil',
                        danger: true,
                        onClick: () => handleDeleteClick(record.id.toString()),
                    },
                ];

                return <DynamicDropdown items={dropdownItems} />;
            },
        },
    ];

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    <LinkButton href={`${url}/new`} title="Yeni Mekan Ekle" />
                }
            />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 bg-white rounded-lg px-4">
                <div className="flex flex-col items-center w-full mb-6">
                    <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <DynamicTable<Venue>
                                data={venues.venues}
                                columns={columns}
                                rowKey="id"
                                showControls={false}
                                pagination={{
                                    pageSize: pageSize,
                                    current: pageNumber,
                                    total: venues.totalCount || 0,
                                    onChange: handlePageChange,
                                    onShowSizeChange: handlePageSizeChange,
                                    responsive: true,
                                    size: 'default',
                                }}
                            />
                        </div>
                    </div>
                    <ConfirmModal
                        isOpen={modal}
                        onClose={() => setModal(false)}
                        title="Mekan Sil"
                        message="Bu içeriği silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                        onConfirm={handleConfirm}
                    />
                    <VenueDetail
                        isOpen={detailsModal}
                        onClose={() => setDetailsModal(false)}
                        detail={venues.venues.find(
                            (item) => item.id.toString() === selectedItem
                        )}
                    />
                </div>
            </div>
        </>
    );
}
