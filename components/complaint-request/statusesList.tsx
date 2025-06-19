'use client';
import React from 'react';
import {
    BreadcrumbItem,
    ComplaintStatuses,
    ComplaintStatusesResponse,
} from '@/types';
import { usePagination } from '@/hooks/usePagination';
import DynamicTable from '@/components/dynamic/table';
import ImageWithSkeleton from '../common/imageSkeleton';
import { formatDateTime } from '@/utils';
import Breadcrumb from '../common/breadCrumb';
import { departmans } from '@/data/departmans';
import { complaintStatusType } from '@/data/complaintStatus';

export default function ComplaintStatusList({
    statuses,
    breadcrumb,
}: {
    statuses: ComplaintStatusesResponse | null;
    breadcrumb: BreadcrumbItem[];
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination();

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 180,
        },
        {
            title: 'Görsel',
            dataIndex: 'profileImage',
            fixed: 'left' as const,
            width: 180,
            render: (value: string) => {
                return (
                    <div className="flex items-center gap-3">
                        {value ? (
                            <ImageWithSkeleton
                                src={value}
                                alt="Profile Görseli"
                                width={80}
                                height={80}
                                className="object-cover w-full h-full rounded-full"
                            />
                        ) : (
                            <div className="w-20 flex items-center justify-center h-full bg-gray-100 text-gray-500 rounded-full">
                                Görsel Yok
                            </div>
                        )}
                    </div>
                );
            },
        },
        {
            title: 'Ad Soyad',
            dataIndex: 'name',
            width: 100,
            render: (value: number, record: ComplaintStatuses) =>
                value + ' ' + record.surname || 'Belirtilmedi',
        },
        {
            title: 'İşlem Yapan',
            dataIndex: 'role',
            width: 100,
            render: (value: number) =>
                departmans.find((item) => item.id === value)?.name,
        },
        {
            title: 'Tarih',
            dataIndex: 'createdDate',
            width: 100,
            render: (value: string) => formatDateTime(value),
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

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <DynamicTable<ComplaintStatuses>
                            data={statuses?.complaintsStatuses || []}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: statuses?.totalCount || 0,
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
