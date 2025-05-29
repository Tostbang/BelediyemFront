'use client';
import React from 'react';
import {
    BreadcrumbItem,
    StaffAttendedComplaintsResponse,
    StaffComplaints,
} from '@/types';
import { usePagination } from '@/hooks/usePagination';
import DynamicTable from '@/components/dynamic/table';
import { formatDateTime } from '@/utils';
import { categoryType } from '@/data/categoryType';
import { complaintStatusType } from '@/data/complaintStatus';
import Breadcrumb from '../common/breadCrumb';
import SelectFilter from '../filters/selectFilter';
import ClearAllFilters from '../filters/clearAllFilters';

export default function AttendedList({
    complaints,
    breadcrumb,
}: {
    complaints: StaffAttendedComplaintsResponse;
    breadcrumb: BreadcrumbItem[];
}) {
    const filterParams = [
        'categoryType',
        'complaintsStatusType',
        'startDate',
        'endDate',
    ];

    const {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        filters,
        filterCount,
        handleFilterChange,
        handleClearAllFilters,
    } = usePagination({ filterParams });

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
            render: (value: number, record: StaffComplaints) => {
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
                        className={`bg-${status?.color || 'gray'}-500 p-1 px-4 rounded-2xl text-white text-center w-fit`}>
                        {status?.name || 'Bilinmiyor'}
                    </span>
                );
            },
        },
    ];

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        {complaints.name} {complaints.surname}
                    </h2>
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                            <SelectFilter
                                keyPrefix="category-select"
                                className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                                value={filters.categoryType?.toString() || ''}
                                onChange={handleFilterChange}
                                placeholder="Tüm Kategoriler"
                                options={categoryType}
                                fieldName="categoryType"
                            />

                            <SelectFilter
                                keyPrefix="complaintsStatusType-select"
                                className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                                value={
                                    filters.complaintsStatusType?.toString() ||
                                    ''
                                }
                                onChange={handleFilterChange}
                                placeholder="Tüm Durumlar"
                                options={complaintStatusType}
                                fieldName="complaintsStatusType"
                            />

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
                        <ClearAllFilters
                            handleClear={handleClearAllFilters}
                            filterCount={filterCount}
                        />
                    </div>
                    <div className="overflow-x-auto">
                        <DynamicTable<StaffComplaints>
                            data={complaints.complaints}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: complaints.totalCount || 0,
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
