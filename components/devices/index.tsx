'use client';
import React, { useState } from 'react';
import { BreadcrumbItem, Devices, DevicesResponse, RoleType } from '@/types';
import DynamicTable from '../dynamic/table';
import ConfirmModal from '../modals/confirmModal';
import {
    closeDeviceAdmin,
    closeDeviceMuni,
    closeDeviceMuniAdmin,
    closeDeviceStaff,
} from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { formatDateTime } from '@/utils';
import Breadcrumb from '../common/breadCrumb';

export default function DevicesList({
    devices,
    type,
    breadcrumb,
}: {
    devices: DevicesResponse;
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
                    result = await closeDeviceAdmin(selectedItem);
                    break;
                case 'municipality':
                    result = await closeDeviceMuni(selectedItem);
                    break;
                case 'staff':
                    result = await closeDeviceStaff(selectedItem);
                    break;
                case 'admin-muni':
                    result = await closeDeviceMuniAdmin(selectedItem);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Geçersiz işlem türü',
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

    const columns = [
        {
            title: 'Kullanıcı Id',
            dataIndex: 'userId',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Cihaz Bilgisi',
            dataIndex: 'deviceInfo',
            width: 180,
        },
        {
            title: 'IP Adresi',
            dataIndex: 'ipAddress',
            width: 180,
        },
        {
            title: 'Son Görülme Tarihi',
            dataIndex: 'loginTime',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
        {
            title: 'İndir',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: Devices) => (
                <div>
                    <button
                        onClick={() => handleCloseDevice(record.id.toString())}
                        className="text-red-500 hover:text-red-700 cursor-pointer">
                        Oturumu Kapat
                    </button>
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
                        <DynamicTable<Devices>
                            data={devices.devices}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={false}
                        />
                    </div>
                </div>
                <ConfirmModal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                    title="Oturumu Kapat"
                    message="Bu cihazdaki oturumu kapatmak istediğinize emin misiniz? Bu işlem geri alınamaz."
                    onConfirm={handleConfirm}
                />
            </div>
        </>
    );
}
