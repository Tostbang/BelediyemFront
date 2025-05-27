'use client';
import React, { useRef } from 'react';
import { StaffAttendedComplaintsResponse, StaffComplaints } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import { departmans } from '@/data/departmans';
import DynamicTable from '@/components/dynamic/table';
import { SearchIcon, TrashIcon } from '../icons';
import { formatDateTime } from '@/utils';

export default function AttendedList({
    complaints,
}: {
    complaints: StaffAttendedComplaintsResponse;
}) {
    const filterParams = [
        'searchText',
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
        handleClearSearch,
        filters,
        handleFilterChange,
    } = usePagination({ filterParams });

    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
        if (searchInputRef.current) {
            handleFilterChange('searchText', searchInputRef.current.value);
        }
    };

    const clearFilters = () => {
        handleClearSearch();
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
    };

    console.log('details', complaints);

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
            render: (status: number) => {
                switch (status) {
                    case 1:
                        return (
                            <span className="bg-green-500 p-1 px-4 rounded-2xl text-white text-center w-fit">
                                Çözüldü
                            </span>
                        );
                    case 2:
                        return (
                            <span className="bg-yellow-500 p-1 px-4 rounded-2xl text-white text-center w-fit">
                                Bekleniyor
                            </span>
                        );
                    case 3:
                        return (
                            <span className="bg-orange-500 p-1 px-4 rounded-2xl text-white text-center w-fit">
                                İnceleniyor
                            </span>
                        );
                    case 4:
                        return (
                            <span className="bg-blue-500 p-1 px-4 rounded-2xl text-white text-center w-fit">
                                Başlatıldı
                            </span>
                        );
                    case 5:
                        return (
                            <span className="bg-red-500 p-1 px-4 rounded-2xl text-white text-center w-fit">
                                Reddedildi
                            </span>
                        );
                    default:
                        return (
                            <span className="bg-gray-500 p-1 px-4 rounded-2xl text-white text-center w-fit">
                                Bilinmiyor
                            </span>
                        );
                }
            },
        },
    ];

    return (
        <div className="flex flex-col items-center w-full mb-6">
            <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                        <select
                            key={`membership-select-${filters.municipalityStaffId || 'default'}`}
                            className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                            value={
                                filters.municipalityStaffId?.toString() || ''
                            }
                            onChange={(e) =>
                                handleFilterChange(
                                    'municipalityStaffType',
                                    e.target.value
                                )
                            }>
                            <option value="">Tüm Departmanlar</option>
                            {departmans.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Arama..."
                                defaultValue={
                                    filters.searchText?.toString() || ''
                                }
                                ref={searchInputRef}
                                className="border border-gray-300 border-r-transparent rounded-l p-2 flex-grow w-full sm:w-64"
                            />
                            <div className="flex items-center">
                                <button
                                    onClick={handleSearch}
                                    className="border border-gray-300 border-r-0 flex items-center cursor-pointer justisfy-center bg-blue-500 hover:bg-blue-600 text-white p-2 h-full min-w-[41px]">
                                    <SearchIcon />
                                </button>
                                <button
                                    onClick={clearFilters}
                                    className="border border-y-gray-300 border-l-0 border-r-gray-300  flex items-center cursor-pointer justify-center bg-red-500 hover:bg-red-600 text-white p-2 h-full min-w-[41px] rounded-r">
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
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
