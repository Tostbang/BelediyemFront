'use client';
import React, { useState } from 'react';
import { BreadcrumbItem, FAQResponse, RoleType } from '@/types';
import ConfirmModal from '../modals/confirmModal';
import {
    deleteFAQAdmin,
    deleteFAQMuni,
    deleteFAQMuniAdmin,
} from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { Collapse } from 'antd';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '../icons';
import LinkButton from '../common/LinkButton';
import Breadcrumb from '../common/breadCrumb';

export default function FaqList({
    faqs,
    type,
    breadcrumb,
}: {
    faqs: FAQResponse;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleCloseDevice = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            let result;
            switch (type) {
                case 'admin':
                    result = await deleteFAQAdmin(selectedItem);
                    break;
                case 'municipality':
                    result = await deleteFAQMuni(selectedItem);
                    break;
                case 'admin-muni':
                    result = await deleteFAQMuniAdmin(selectedItem);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Unsupported role type',
                    };
            }

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
        case 'admin':
            url = '/admin/faq';
            break;
        case 'municipality':
            url = '/municipality/faq';
        case 'admin-muni':
            url = '/adminmunicipality/faq';
            break;
        default:
            url = '';
    }

    const editedItems = faqs?.frequentlyAskedQuestions?.map((item, index) => ({
        key: index,
        label: <div className="text-2xl"> {item.title}</div>,
        children: (
            <div>
                <div className="flex flex-col gap-2">
                    <div className="text-xl opacity-90">{item.description}</div>
                </div>
                {type !== 'staff' && (
                    <div className="flex justify-end mt-4">
                        <Link
                            href={`${url}/${item.id}`}
                            className="flex items-center text-amber-500 hover:text-amber-700 mr-3 w-6 h-6">
                            <PencilIcon />
                        </Link>
                        <button
                            onClick={() =>
                                handleCloseDevice(item.id.toString())
                            }
                            className="flex items-center text-red-500 hover:text-red-700 cursor-pointer w-6 h6">
                            <TrashIcon />
                        </button>
                    </div>
                )}
            </div>
        ),
    }));

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    type !== 'staff' && (
                        <LinkButton href={`${url}/new`} title="Yeni SSS Ekle" />
                    )
                }
            />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden">
                    <div className="overflow-x-auto">
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
                    </div>
                </div>
                <ConfirmModal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                    title="SSS Sil"
                    message="Bu içeriği silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                    onConfirm={handleConfirm}
                />
            </div>
        </>
    );
}
