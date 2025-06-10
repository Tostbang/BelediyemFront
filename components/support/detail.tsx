'use client';
import React, { useState } from 'react';
import { BreadcrumbItem, RoleType, SupportDetailResponse } from '@/types';
import { formatDateTime } from '@/utils';
import { DateIcon, EnvelopeIcon, PhoneIcon } from '../icons';
import Breadcrumb from '../common/breadCrumb';
import { supportType } from '@/data/supportType';
import ConfirmModal from '../modals/confirmModal';
import { forwardSupportToAdminMuni, rejecetSupportMuni } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import ReplyModal from './replyModal';

export default function SupportDetail({
    id,
    detail,
    breadcrumb,
    type,
}: {
    id: string | null;
    detail?: SupportDetailResponse | null;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    const [modal, setModal] = useState(false);
    const [forwardModal, setForwardModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const renderStatusBadge = (value: number) => {
        const status = supportType.find((item) => item.id === value);
        return (
            <div
                className={`${status ? status.bgColor : 'bg-gray-500'} p-1 px-4 rounded-2xl  text-white text-center w-fit`}>
                <span> {status?.name || 'Bilinmiyor'}</span>
            </div>
        );
    };

    const handleForwardConfirm = async () => {
        if (id) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await forwardSupportToAdminMuni(id);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Unsupported role type',
                    };
            }

            if (result.success) {
                handleSuccess(result.message);
                setForwardModal(false);
                router.refresh();
            } else {
                handleError(result);
                setForwardModal(false);
            }
        }
    };

    const handleRejectConfirm = async () => {
        if (id) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await rejecetSupportMuni(id);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Unsupported role type',
                    };
            }

            if (result.success) {
                handleSuccess(result.message);
                setRejectModal(false);
                router.refresh();
            } else {
                handleError(result);
                setRejectModal(false);
            }
        }
    };

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={renderStatusBadge(
                    Number(detail?.support.supportStatusType)
                )}
            />
            <div className="w-full px-4">
                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Kişi Bilgileri
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <span className="font-medium text-gray-600 w-24">
                                    Ad Soyad:
                                </span>
                            </div>
                            <span className="text-gray-700 sm:ml-4">
                                {detail?.support.name} {detail?.support.surname}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                    <EnvelopeIcon />
                                </div>
                                <span className="font-medium text-gray-600">
                                    E-posta:
                                </span>
                            </div>
                            <span className="text-gray-700 sm:ml-4 break-all">
                                {detail?.support.email}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                    <PhoneIcon />
                                </div>
                                <span className="font-medium text-gray-600">
                                    Telefon:
                                </span>
                            </div>
                            <span className="text-gray-700 sm:ml-4">
                                {detail?.support.phone}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Destek Talebi
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Konu</h3>
                            <p className="text-gray-700">
                                {detail?.support.title}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Mesaj</h3>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {detail?.support.message}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                    <DateIcon />
                                </div>
                                <span className="font-medium text-gray-600">
                                    Oluşturulma tarihi:
                                </span>
                            </div>
                            <span className="text-gray-700 sm:ml-4">
                                {formatDateTime(
                                    detail?.support.createdDate ?? ''
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Destek Talebi Yanıtı
                    </h2>
                    {detail?.support.answeredText ? (
                        <div className="space-y-4">
                            <div>
                                <p className="text-gray-700 whitespace-pre-wrap">
                                    {detail.support.answeredText}
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center">
                                <div className="flex items-center mb-2 sm:mb-0">
                                    <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                        <DateIcon />
                                    </div>
                                    <span className="font-medium text-gray-600">
                                        Yanıtlanma tarihi:
                                    </span>
                                </div>
                                <span className="text-gray-700 sm:ml-4">
                                    {formatDateTime(
                                        detail?.support.modifiedDate ?? ''
                                    )}
                                </span>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">
                            Bu destek talebi henüz yanıtlanmamıştır.
                        </p>
                    )}
                </div>
                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">İşlemler</h2>
                    <div className="flex flex-col md:flex-row gap-4">
                        <button
                            onClick={() => setModal(true)}
                            className="px-4 py-2 bg-green-600 text-white rounded-2xl hover:bg-green-700 w-full cursor-pointer">
                            Yanıtla
                        </button>
                        {type === 'municipality' && (
                            <button
                                onClick={() => setForwardModal(true)}
                                className="px-4 py-2 bg-blue-600 text-white  rounded-2xl hover:bg-blue-700  w-full cursor-pointer">
                                Admine İlet
                            </button>
                        )}
                        <button
                            onClick={() => setRejectModal(true)}
                            className="px-4 py-2 bg-red-600 text-white  rounded-2xl hover:bg-red-700  w-full cursor-pointer">
                            Reddet
                        </button>
                        <ReplyModal
                            isOpen={modal}
                            onClose={() => setModal(false)}
                            id={id || ''}
                            type={type}
                        />
                        <ConfirmModal
                            isOpen={forwardModal}
                            onClose={() => setForwardModal(false)}
                            title="Admine İlet"
                            message="Bu içeriği admine iletmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                            onConfirm={handleForwardConfirm}
                        />

                        <ConfirmModal
                            isOpen={rejectModal}
                            onClose={() => setRejectModal(false)}
                            title="Reddet"
                            message="Bu içeriği reddetmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                            onConfirm={handleRejectConfirm}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
