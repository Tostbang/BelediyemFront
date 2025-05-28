'use client';
import React from 'react';
import { StaffAttendedComplaintsResponse, StaffComplaints } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import DynamicTable from '@/components/dynamic/table';
import { formatDateTime } from '@/utils';
import { XIcon } from '../icons';
import { categoryType } from '@/data/categoryType';
import { complaintStatusType } from '@/data/complaintStatus';

export default function AttendedList({
    complaints,
}: {
    complaints: StaffAttendedComplaintsResponse;
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
            dataIndex: 'modifiedDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
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
        <div className="flex flex-col items-center w-full mb-6">
            <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                        <select
                            key={`category-select-${filters.categoryType || 'default'}`}
                            className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                            value={filters.categoryType?.toString() || ''}
                            onChange={(e) =>
                                handleFilterChange(
                                    'categoryType',
                                    e.target.value
                                )
                            }>
                            <option value="">Tüm Kategoriler</option>
                            {categoryType.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <select
                            key={`complaintsStatusType-select-${filters.complaintsStatusType || 'default'}`}
                            className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                            value={
                                filters.complaintsStatusType?.toString() || ''
                            }
                            onChange={(e) =>
                                handleFilterChange(
                                    'complaintsStatusType',
                                    e.target.value
                                )
                            }>
                            <option value="">Tüm Durumlar</option>
                            {complaintStatusType.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
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
                                    value={filters.startDate?.toString() || ''}
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
                                    value={filters.endDate?.toString() || ''}
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
    );
}
