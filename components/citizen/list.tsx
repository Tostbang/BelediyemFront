'use client';
import React, { useRef } from 'react';
import { CitezenUser, CitizenUserResponse } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import DynamicTable from '@/components/dynamic/table';
import { formatDateTime } from '@/utils';
import { PersonIcon, SearchIcon, TrashIcon } from '../icons';
import ImageWithSkeleton from '../common/imageSkeleton';

export default function CitizenList({ users }: { users: CitizenUserResponse }) {
    const filterParams = ['searchText'];
    const searchInputRef = useRef<HTMLInputElement>(
        null
    ) as React.RefObject<HTMLInputElement>;

    const {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        filters,
        handleSearch,
        handleClearSearch,
    } = usePagination({
        filterParams,
        searchInputRef,
    });

    const columns = [
        {
            title: 'Id',
            dataIndex: 'userId',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Ad Soyad',
            dataIndex: 'name',
            fixed: 'left' as const,
            width: 180,
            render: (text: string, record: CitezenUser) =>
                text + ' ' + record.surname,
        },
        {
            title: 'Fotoğraf',
            dataIndex: 'profileImage',

            width: 180,
            render: (value: string) => {
                return value ? (
                    <ImageWithSkeleton
                        src={value}
                        alt="Vatandaş Fotoğrafı"
                        width={250}
                        height={250}
                        className="object-cover w-full h-full rounded-full"
                    />
                ) : (
                    <div className="w-20 flex items-center justify-center h-full bg-gray-100 text-gray-500 rounded-full">
                        <PersonIcon />
                    </div>
                );
            },
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
            title: 'Kimlik No',
            dataIndex: 'identityNumber',
            width: 180,
            render: (text: string) => {
                return text ? (
                    <span className="break-all">{text}</span>
                ) : (
                    <span className="text-gray-500">Belirtilmemiş</span>
                );
            },
        },
        {
            title: 'Doğum Tarihi',
            dataIndex: 'birthDay',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
        {
            title: 'Kayıt Tarihi',
            dataIndex: 'createdDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
    ];

    return (
        <div className="flex flex-col items-center w-full mb-6">
            <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
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
                                    onClick={handleClearSearch}
                                    className="border border-y-gray-300 border-l-0 border-r-gray-300  flex items-center cursor-pointer justify-center bg-red-500 hover:bg-red-600 text-white p-2 h-full min-w-[41px] rounded-r">
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <DynamicTable<CitezenUser>
                        data={users.users}
                        columns={columns}
                        rowKey="userId"
                        showControls={false}
                        pagination={{
                            pageSize: pageSize,
                            current: pageNumber,
                            total: users.totalCount || 0,
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
