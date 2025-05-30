'use client';
import React, { useState } from 'react';
import { BreadcrumbItem, Municipalities, MuniListResponse } from '@/types';
import DynamicTable from '../dynamic/table';
import ConfirmModal from '../modals/confirmModal';
import { updateMuniStatusAdmin } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils';
import ImageWithSkeleton from '../common/imageSkeleton';
import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import LinkButton from '../common/LinkButton';
import Breadcrumb from '../common/breadCrumb';
import StatusBadge from '../common/StatusBadge';
import DynamicDropdown from '../common/DynamicDropdown';

export default function MuniList({
    munilist,
    breadcrumb,
}: {
    munilist: MuniListResponse;
    breadcrumb: BreadcrumbItem[];
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination();
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleDeleteClick = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            const result = await updateMuniStatusAdmin(selectedItem, false);

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
            title: 'Kullanıcı Id',
            dataIndex: 'id',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Görsel',
            dataIndex: 'logoImg',
            width: 180,
            render: (value: string) => (
                <div className="w-16 h-16 rounded-md bg-gray-200 border-gray-200 overflow-hidden flex items-center justify-center">
                    {value ? (
                        <ImageWithSkeleton
                            src={value}
                            alt="logo"
                            width={100}
                            height={100}
                            className="w-full h-full object-contain rounded-md self-center"
                        />
                    ) : (
                        <div className="text-xs text-gray-400">Görsel yok</div>
                    )}
                </div>
            ),
        },
        {
            title: 'Belediye Adı',
            dataIndex: 'name',
            width: 180,
        },
        {
            title: 'E-posta',
            dataIndex: 'email',
            width: 180,
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            width: 180,
        },
        {
            title: 'Üyelik Başlangıcı',
            dataIndex: 'membershipStartDate',
            width: 180,
            render: (text: string) => formatDate(text),
        },
        {
            title: 'Üyelik Bitişi',
            dataIndex: 'membershipEndDate',
            width: 180,
            render: (text: string) => formatDate(text),
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
            render: (_: unknown, record: Municipalities) => {
                const dropdownItems = [
                    {
                        key: 'edit',
                        label: (
                            <Link href={`/admin/municipality/${record.id}`}>
                                Düzenle / Görüntüle
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
                    <LinkButton
                        href="/admin/municipality/new"
                        title="Yeni Belediye Ekle"
                    />
                }
            />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <DynamicTable<Municipalities>
                            data={munilist.municipalLists}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: munilist.totalCount || 0,
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
                    title="Belediye Sil"
                    message="Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                    onConfirm={handleConfirm}
                />
            </div>
        </>
    );
}
