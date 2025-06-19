'use client';
import React from 'react';
import { BreadcrumbItem, ContractsResponse } from '@/types';
import { Collapse } from 'antd';
import Breadcrumb from '../common/breadCrumb';
import ReadMarkDown from '../common/readMarkdown';
import NoContent from '../common/noContent';

export default function ContractListCollapse({
    contracts,
    breadcrumb,
}: {
    contracts: ContractsResponse | null;
    breadcrumb: BreadcrumbItem[];
    showActions?: boolean;
}) {
    const editedItems = contracts?.contract?.map((item, index) => ({
        key: index,
        label: <div className="text-2xl"> {item.name}</div>,
        children: (
            <div>
                <div className="flex flex-col gap-2">
                    <ReadMarkDown source={item.content} />
                </div>
            </div>
        ),
    }));

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden">
                    <div className="overflow-x-auto">
                        {contracts?.contract &&
                        contracts.contract.length > 0 ? (
                            <Collapse
                                items={editedItems}
                                className="faq-collapse"
                                bordered={false}
                                expandIconPosition="end"
                                style={{
                                    backgroundColor: 'white',
                                    borderRadius: '8px',
                                }}
                            />
                        ) : (
                            <div className="bg-white rounded-lg shadow-sm">
                                <NoContent
                                    message="Sık Sorulan Soru Bulunamadı"
                                    className="py-16"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
