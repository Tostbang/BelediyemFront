'use client';
import React from 'react';
import { BreadcrumbItem, Contract, ContractsResponse, RoleType } from '@/types';
import DynamicTable from '../dynamic/table';
import Link from 'next/link';
import { contractTypes } from '@/data/contractTypes';
import Breadcrumb from '../common/breadCrumb';

export default function ContractList({
    contracts,
    breadcrumb,
    type,
}: {
    contracts: ContractsResponse;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    let url;
    switch (type) {
        case 'admin':
            url = '/admin/contract';
            break;
        case 'municipality':
            url = '/municipality/contract';
            break;
        default:
            url = '';
            break;
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
            dataIndex: 'name',
            width: 180,
        },
        {
            title: 'Sözleşme Tipi',
            dataIndex: 'contractType',
            width: 180,
            render: (value: number) => (
                <>
                    {value} -
                    {contractTypes.find((item) => item.id === value)?.name}
                </>
            ),
        },
        {
            title: 'İçerik',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: Contract) => (
                <div>
                    <Link
                        href={`${url}/${record.id}`}
                        className="text-blue-500 hover:underline">
                        Düzenle / Görüntüle
                    </Link>
                </div>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <DynamicTable<Contract>
                            data={contracts.contract}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={false}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
