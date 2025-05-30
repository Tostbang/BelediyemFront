'use client';
import React, { useRef } from 'react';
import { BreadcrumbItem, CitezenUser, CitizenUserResponse } from '@/types';
import { usePagination } from '@/hooks/usePagination';
import DynamicTable from '@/components/dynamic/table';
import { formatDateTime } from '@/utils';
import { PersonIcon } from '../icons';
import ImageWithSkeleton from '../common/imageSkeleton';
import Breadcrumb from '../common/breadCrumb';
import SearchFilter from '../filters/searchFilter';

export default function CitizenList({
    users,
    breadcrumb,
}: {
    users: CitizenUserResponse;
    breadcrumb: BreadcrumbItem[];
}) {
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
            title: 'Görsel',
            dataIndex: 'profileImage',
            width: 180,
            render: (value: string) => {
                return value ? (
                    <ImageWithSkeleton
                        src={value}
                        alt="Vatandaş Görseli"
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
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                        <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                            <SearchFilter
                                onClear={handleClearSearch}
                                onFilter={handleSearch}
                                searchInputRef={searchInputRef}
                                searchText={filters.searchText?.toString()}
                            />
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
        </>
    );
}
