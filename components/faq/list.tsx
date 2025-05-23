'use client';
import React, { useState } from 'react';
import { FAQ, RoleType } from '@/types';
import ConfirmModal from '../modals/confirmModal';
import { deleteFAQAdmin, deleteFAQMuni } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { Collapse } from 'antd';
import Link from 'next/link';
import { PencilIcon, TrashIcon } from '../icons';
import LinkButton from '../common/LinkButton';

export default function FaqList({
    faqs,
    type,
}: {
    faqs: FAQ[];
    type: RoleType;
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
            break;
        default:
            url = '';
    }

    const editedItems = faqs?.map((item, index) => ({
        key: index,
        label: <div className="text-3xl"> {item.title}</div>,
        children: (
            <div>
                <div className="flex flex-col gap-2">
                    <div className="text-2xl opacity-90">
                        {item.description}
                    </div>
                </div>
                {type !== 'staff' && (
                    <div className="flex justify-end mt-4">
                        <Link
                            href={`${url}/${item.id}`}
                            className="flex items-center text-amber-500 hover:text-amber-700 mr-3">
                            <PencilIcon />
                        </Link>
                        <button
                            onClick={() =>
                                handleCloseDevice(item.id.toString())
                            }
                            className="flex items-center text-red-500 hover:text-red-700 cursor-pointer">
                            <TrashIcon />
                        </button>
                    </div>
                )}
            </div>
        ),
    }));

    return (
        <div className="flex flex-col items-center w-full mb-6">
            <div className="w-full overflow-hidden">
                {type !== 'staff' && (
                    <div className="flex justify-end mb-4">
                        <LinkButton href={`${url}/new`} title="Yeni SSS Ekle" />
                    </div>
                )}
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
    );
}
