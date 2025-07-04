'use client';
import React, { useState, useRef } from 'react';
import {
    Announcement,
    AnnouncementResponse,
    BreadcrumbItem,
    RoleType,
} from '@/types';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import LinkButton from '@/components/common/LinkButton';
import DynamicTable from '@/components/dynamic/table';
import ConfirmModal from '@/components/modals/confirmModal';
import { FilterIcon, PersonIcon } from '../icons';
import ImageWithSkeleton from '../common/imageSkeleton';
import { deleteAnnMuni, deleteAnnMuniAdmin } from '@/app/actions';
import { annType } from '@/data/annType';
import { formatDateTime } from '@/utils';
import Breadcrumb from '../common/breadCrumb';
import DateFiltersModal from '../filters/dateFiltersModal';
import SelectFilter from '../filters/selectFilter';
import ClearAllFilters from '../filters/clearAllFilters';
import DynamicDropdown from '../common/DynamicDropdown';
import AnnDetail from './detail';

export default function EventList({
    events,
    breadcrumb,
    type,
}: {
    events: AnnouncementResponse | null;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    const filterParams = ['startDate', 'endDate', 'announcementsType'];

    const startDateRef = useRef<HTMLInputElement>(
        null
    ) as React.RefObject<HTMLInputElement>;
    const endDateRef = useRef<HTMLInputElement>(
        null
    ) as React.RefObject<HTMLInputElement>;

    const {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleClearAllFilters,
        filters,
        filterCount,
        handleFilterChange,
        handleDateFilter,
        handleClearDateFilters,
    } = usePagination({ filterParams, startDateRef, endDateRef });

    const [modal, setModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleDetailClick = (id: string) => {
        setSelectedItem(id);
        setDetailsModal(true);
    };

    const handleDeleteClick = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await deleteAnnMuni(selectedItem);
                    break;
                case 'admin-muni':
                    result = await deleteAnnMuniAdmin(selectedItem);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Geçersiz işlem türü',
                    };
            }

            result = await deleteAnnMuni(selectedItem);
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
            url = '/municipality/event';
            break;
        case 'admin-muni':
            url = '/adminmunicipality/event';
            break;
        default:
            url = '';
    }

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
                                alt="Etkinlik Görseli"
                                width={80}
                                height={80}
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
            render: (_: unknown, record: Announcement) => {
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

    const handleDateFilterChange = () => {
        handleDateFilter();
        setShowDateFilter(false);
    };

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    <LinkButton
                        href={`${url}/new`}
                        title="Yeni Etkinlik Ekle"
                    />
                }
            />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 bg-white rounded-lg px-4">
                <div className="flex flex-wrap sm:flex-nowrap items-center w-full lg:w-auto gap-2 sm:gap-0">
                    <div className="w-8 h-8 min-h-8 min-w-8 mt-2 lg:mt-0 flex items-center justify-center sm:justify-start mx-auto sm:mx-0 sm:mr-4">
                        <FilterIcon />
                    </div>

                    <div className="hidden sm:block h-10 lg:h-20 w-px bg-gray-300"></div>
                    <div className="block sm:hidden w-full h-px bg-gray-300"></div>

                    <button
                        onClick={() => setShowDateFilter(true)}
                        className="hover:bg-gray-50 cursor-pointer flex items-center justify-center h-10 lg:h-20 w-full sm:w-auto text-sm sm:text-base p-4">
                        Tarih Seç
                    </button>

                    <div className="hidden sm:block h-10 lg:h-20 w-px bg-gray-300"></div>
                    <div className="block sm:hidden w-full h-px bg-gray-300"></div>

                    <DateFiltersModal
                        isOpen={showDateFilter}
                        onClose={() => setShowDateFilter(false)}
                        onFilter={handleDateFilterChange}
                        onClear={handleClearDateFilters}
                        startDateRef={startDateRef}
                        endDateRef={endDateRef}
                        startDate={filters.startDate?.toString()}
                        endDate={filters.endDate?.toString()}
                    />

                    <SelectFilter
                        keyPrefix="ann-select"
                        className="hover:bg-gray-50 cursor-pointer h-10 lg:h-20 w-full sm:w-auto text-sm sm:text-base sm:px-4"
                        value={filters.announcementsType?.toString() || ''}
                        onChange={handleFilterChange}
                        placeholder="İçerik Türüne Göre Filtrele"
                        options={annType}
                        fieldName="announcementsType"
                    />

                    <div className="hidden sm:block h-10 lg:h-20 w-px bg-gray-300"></div>
                    <div className="block sm:hidden w-full h-px bg-gray-300"></div>
                </div>
                <ClearAllFilters
                    handleClear={handleClearAllFilters}
                    filterCount={filterCount}
                />
            </div>

            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <DynamicTable<Announcement>
                            data={events?.announcements || []}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: events?.totalCount || 0,
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
                    title="Etkinliği Sil"
                    message="Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                    onConfirm={handleConfirm}
                />
                <AnnDetail
                    isOpen={detailsModal}
                    onClose={() => setDetailsModal(false)}
                    detail={events?.announcements.find(
                        (item) => item.id.toString() === selectedItem
                    )}
                />
            </div>
        </>
    );
}
