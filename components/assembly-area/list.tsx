'use client';
import React, { useState } from 'react';
import { Assembly, AssemblyResponse, BreadcrumbItem, RoleType } from '@/types';
import ConfirmModal from '../modals/confirmModal';
import { deleteAssemblyMuni, deleteAssemblyMuniAdmin } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import LinkButton from '../common/LinkButton';
import Breadcrumb from '../common/breadCrumb';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';
import { formatDateTime } from '@/utils';
import StatusBadge from '../common/StatusBadge';
import DynamicDropdown from '../common/DynamicDropdown';
import AssemblyDetail from './detail';

export default function AssemblyList({
    assemblies,
    type,
    breadcrumb,
}: {
    assemblies: AssemblyResponse | null;
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
                    result = await deleteAssemblyMuni(selectedItem);
                    break;
                case 'admin-muni':
                    result = await deleteAssemblyMuniAdmin(selectedItem);
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

    let url;
    switch (type) {
        case 'municipality':
            url = '/municipality/assembly-area';
            break;
        case 'admin-muni':
            url = '/adminmunicipality/assembly-area';
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
            render: (_: unknown, record: Assembly) => {
                const dropdownItems = [
                    {
                        key: 'detail',
                        label: 'Detay',
                        onClick: () => handleDetailClick(record.id.toString()),
                    },
                    {
                        key: 'edit',
                        label: (
                            <Link href={`${url}/${record.id}`}>Düzenle</Link>
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
                        href={`${url}/new`}
                        title="Yeni Toplanma Alanı Ekle"
                    />
                }
            />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 bg-white rounded-lg px-4">
                <div className="flex flex-col items-center w-full mb-6">
                    <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                        <div className="overflow-x-auto">
                            <DynamicTable<Assembly>
                                data={assemblies?.assemblyAreas || []}
                                columns={columns}
                                rowKey="id"
                                showControls={false}
                                pagination={{
                                    pageSize: pageSize,
                                    current: pageNumber,
                                    total: assemblies?.totalCount || 0,
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
                        title="Toplanma Alanı Sil"
                        message="Bu içeriği silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                        onConfirm={handleConfirm}
                    />
                    <AssemblyDetail
                        isOpen={detailsModal}
                        onClose={() => setDetailsModal(false)}
                        detail={assemblies?.assemblyAreas.find(
                            (item) => item.id.toString() === selectedItem
                        )}
                    />
                </div>
            </div>
        </>
    );
}
