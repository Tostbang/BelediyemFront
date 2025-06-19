'use client';
import React, { useRef, useState } from 'react';
import { BreadcrumbItem, ComplaintsResponse, Complaints } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import DynamicTable from '@/components/dynamic/table';
import { formatDateTime } from '@/utils';
import { categoryType } from '@/data/categoryType';
import { complaintStatusType } from '@/data/complaintStatus';
import Breadcrumb from '../common/breadCrumb';
import SelectFilter from '../filters/selectFilter';
import ClearAllFilters from '../filters/clearAllFilters';
import { FilterIcon } from '../icons';
import DateFiltersModal from '../filters/dateFiltersModal';

export default function AttendedList({
    complaints,
    breadcrumb,
}: {
    complaints: ComplaintsResponse | null;
    breadcrumb: BreadcrumbItem[];
}) {
    const filterParams = [
        'categoryType',
        'complaintsStatusType',
        'startDate',
        'endDate',
    ];
    const [showDateFilter, setShowDateFilter] = useState(false);

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
        filters,
        filterCount,
        handleFilterChange,
        handleClearAllFilters,
        handleDateFilter,
        handleClearDateFilters,
    } = usePagination({ filterParams, startDateRef, endDateRef });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Kategori',
            dataIndex: 'categoryType',
            width: 180,
            render: (value: number) =>
                categoryType.find((item) => item.id === value)?.name,
        },
        {
            title: 'Talep Tarihi',
            dataIndex: 'createdDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
        {
            title: 'Çözülme Tarihi',
            dataIndex: 'complaintsStatusType',
            width: 180,
            render: (value: number, record: Complaints) => {
                if (value === 4 && record.complaintsStatus?.length > 0) {
                    const matchingStatus = record.complaintsStatus.find(
                        (status) => status.complaintsStatusType === 4
                    );

                    if (matchingStatus) {
                        return formatDateTime(matchingStatus.createdDate);
                    }
                }
                return 'Henüz Çözülmedi';
            },
        },
        {
            title: 'Durum',
            dataIndex: 'complaintsStatusType',
            width: 100,
            render: (value: number) => {
                const status = complaintStatusType.find(
                    (item) => item.id === value
                );

                return (
                    <span
                        className={`${status ? status.bgColor : 'bg-gray-500'} p-1 px-4 rounded-2xl  text-white text-center w-fit`}>
                        {status?.name || 'Bilinmiyor'}
                    </span>
                );
            },
        },
    ];

    const handleDateFilterChange = () => {
        handleDateFilter();
        setShowDateFilter(false);
    };

    console.log("complaints", complaints);

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
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
                        keyPrefix="category-select"
                        className="hover:bg-gray-50 cursor-pointer h-10 lg:h-20 w-full sm:w-auto text-sm sm:text-base sm:px-4"
                        value={filters.categoryType?.toString() || ''}
                        onChange={handleFilterChange}
                        placeholder="Kategoriye Göre"
                        options={categoryType}
                        fieldName="categoryType"
                    />
                    <div className="hidden sm:block h-10 lg:h-20 w-px bg-gray-300"></div>
                    <div className="block sm:hidden w-full h-px bg-gray-300"></div>

                    <SelectFilter
                        keyPrefix="complaintsStatusType-select"
                        className="hover:bg-gray-50 cursor-pointer h-10 lg:h-20 w-full sm:w-auto text-sm sm:text-base sm:px-4"
                        value={filters.complaintsStatusType?.toString() || ''}
                        onChange={handleFilterChange}
                        placeholder="Duruma Göre"
                        options={complaintStatusType}
                        fieldName="complaintsStatusType"
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
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {complaints?.name} {complaints?.surName}
                    </h2>

                    <div className="overflow-x-auto">
                        <DynamicTable<Complaints>
                            data={complaints?.complaints || []}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: complaints?.totalCount || 0,
                                onChange: handlePageChange,
                                onShowSizeChange: handlePageSizeChange,
                                responsive: true,
                                size: 'default',
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
