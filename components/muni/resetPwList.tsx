'use client';
import React, { useState } from 'react';
import { PasswordReset, PasswordResetResponse } from '@/types';
import DynamicTable from '../dynamic/table';
import ConfirmModal from '../modals/confirmModal';
import { sendMunisPWAdmin } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { usePagination } from '@/hooks/usePagination';
import { formatDateTime } from '@/utils';

export default function PWResetList({
    requests,
}: {
    requests: PasswordResetResponse;
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination();
    const [modal, setModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleSendMailClick = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            const result = await sendMunisPWAdmin(selectedItem);

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

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Kullanıcı Id',
            dataIndex: 'userId',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Belediye Adı',
            dataIndex: 'name',
            width: 180,
        },
        {
            title: 'E-posta',
            dataIndex: 'email',
            width: 180,
        },
        {
            title: 'Talep Tarihi',
            dataIndex: 'createdDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
        {
            title: 'Durum',
            dataIndex: 'passwordResetStatus',
            width: 180,
            render: (value: number) => {
                switch (value) {
                    case 1:
                        return (
                            <span className="text-yellow-500">Beklemede</span>
                        );
                    case 2:
                        return (
                            <span className="text-green-500">
                                Yeni Şifre Gönderildi
                            </span>
                        );
                    default:
                        return (
                            <span className="text-gray-500">Bilinmiyor</span>
                        );
                }
            },
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: PasswordReset) => (
                <div>
                    <button
                        onClick={() =>
                            handleSendMailClick(record.id.toString())
                        }
                        className="text-red-500 hover:text-red-700 cursor-pointer">
                        Mail Gönder
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col items-center w-full mb-6">
            <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                <div className="overflow-x-auto">
                    <DynamicTable<PasswordReset>
                        data={requests.requests}
                        columns={columns}
                        rowKey="id"
                        showControls={false}
                        pagination={{
                            pageSize: pageSize,
                            current: pageNumber,
                            total: requests.totalCount || 0,
                            onChange: handlePageChange,
                            onShowSizeChange: handlePageSizeChange,
                            responsive: true,
                            size: 'default',
                        }}
                    />
                </div>
            </div>
            <ConfirmModal
                isOpen={modal}
                onClose={() => setModal(false)}
                title="Mail Gönder"
                message="Bu maile şifre sıfırlama talebi gönderilecek. Onaylıyor musunuz?"
                onConfirm={handleConfirm}
            />
        </div>
    );
}
