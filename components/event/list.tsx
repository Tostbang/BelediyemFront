'use client';
import React, { useState, useRef } from 'react';
import { Announcement, AnnouncementResponse, BreadcrumbItem } from '@/types';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'antd';
import Link from 'next/link';
import { MoreOutlined } from '@ant-design/icons';
import { usePagination } from '@/hooks/usePagination';
import LinkButton from '@/components/common/LinkButton';
import DynamicTable from '@/components/dynamic/table';
import ConfirmModal from '@/components/modals/confirmModal';
import { PersonIcon, XIcon } from '../icons';
import ImageWithSkeleton from '../common/imageSkeleton';
import { deleteAnnMuni } from '@/app/actions/municipality/ann';
import { annType } from '@/data/annType';
import { formatDateTime } from '@/utils';
import Breadcrumb from '../common/breadCrumb';

export default function EventList({
    events,
    breadcrumb,
}: {
    events: AnnouncementResponse;
    breadcrumb: BreadcrumbItem[];
}) {
    const filterParams = ['startDate', 'endDate', 'announcementsType'];
    const searchInputRef = useRef<HTMLInputElement>(
        null
    ) as React.RefObject<HTMLInputElement>;

    const {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleClearAllFilters,
        filters,
        handleFilterChange,
    } = usePagination({ filterParams, searchInputRef });

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
            const result = await deleteAnnMuni(selectedItem);
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
            title: 'İçeriğin Adı',
            dataIndex: 'title',
            fixed: 'left' as const,
            width: 180,
            render: (value: string, record: Announcement) => {
                return (
                    <div className="flex items-center gap-3">
                        {record.image ? (
                            <ImageWithSkeleton
                                src={record.image}
                                alt="Etkinlik Fotoğrafı"
                                width={50}
                                height={50}
                                className="object-cover w-full h-full rounded-full"
                            />
                        ) : (
                            <div className="w-20 flex items-center justify-center h-full bg-gray-100 text-gray-500 rounded-full">
                                <PersonIcon />
                            </div>
                        )}
                        <span className="font-medium">{value}</span>
                    </div>
                );
            },
        },
        {
            title: 'İçerik Türü',
            dataIndex: 'announcementsType',
            width: 100,
            render: (value: number) =>
                annType.find((item) => item.id === value)?.name || 'Bilinmiyor',
        },
        {
            title: 'Tarih',
            dataIndex: 'createdDate',
            width: 100,
            render: (value: string) => formatDateTime(value),
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: Announcement) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'edit',
                                label: (
                                    <Link
                                        href={`/municipality/event/${record.id}`}>
                                        Düzenle / Görüntüle
                                    </Link>
                                ),
                            },
                            {
                                key: 'delete',
                                label: 'Sil',
                                danger: true,
                                onClick: () =>
                                    handleDeleteClick(record.id.toString()),
                            },
                        ],
                    }}>
                    <a onClick={(e) => e.preventDefault()} className="text-2xl">
                        <MoreOutlined />
                    </a>
                </Dropdown>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    <LinkButton
                        href="/municipality/event/new"
                        title="Yeni Etkinlik Ekle"
                    />
                }
            />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                            <select
                                key={`ann-select-${filters.announcementsType || 'default'}`}
                                className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                                value={
                                    filters.announcementsType?.toString() || ''
                                }
                                onChange={(e) =>
                                    handleFilterChange(
                                        'announcementsType',
                                        e.target.value
                                    )
                                }>
                                <option value="">Tüm Türler</option>
                                {annType.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                <div className="flex items-center gap-1 w-full sm:w-auto">
                                    <label
                                        htmlFor="startDate"
                                        className="text-sm whitespace-nowrap">
                                        Başlangıç:
                                    </label>
                                    <input
                                        id="startDate"
                                        type="date"
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={
                                            filters.startDate?.toString() || ''
                                        }
                                        onChange={(e) =>
                                            handleFilterChange(
                                                'startDate',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="flex items-center gap-1 w-full sm:w-auto">
                                    <label
                                        htmlFor="endDate"
                                        className="text-sm whitespace-nowrap">
                                        Bitiş:
                                    </label>
                                    <input
                                        id="endDate"
                                        type="date"
                                        className="border border-gray-300 rounded p-2 w-full"
                                        value={
                                            filters.endDate?.toString() || ''
                                        }
                                        onChange={(e) =>
                                            handleFilterChange(
                                                'endDate',
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleClearAllFilters}
                            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200 flex items-center gap-1 ml-auto mt-3 sm:mt-0">
                            <div className="w-4 h-4">
                                <XIcon />
                            </div>
                            Filtreleri Temizle
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <DynamicTable<Announcement>
                            data={events.announcements}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: events.totalCount || 0,
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
                    title="Personel Sil"
                    message="Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                    onConfirm={handleConfirm}
                />
            </div>
        </>
    );
}
