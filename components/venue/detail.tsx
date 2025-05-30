'use client';
import React from 'react';
import ImageWithSkeleton from '../common/imageSkeleton';
import { DateIcon, InfoIcon } from '../icons';
import Modal from '../common/modal';
import { Venue } from '@/types';
import StatusBadge from '../common/StatusBadge';
import { formatDateTime } from '@/utils';

export default function VenueDetail({
    isOpen,
    onClose,
    detail,
}: {
    isOpen: boolean;
    onClose: () => void;
    detail?: Venue;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-6">
                <h1 className="mb-4 text-2xl text-center font-semibold break-all">
                    {detail?.title}
                </h1>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-center mb-6 md:mb-0">
                        <div className="overflow-hidden border-2 border-gray-100 shadow-md rounded-lg w-full h-48 md:h-64">
                            {detail?.image ? (
                                <ImageWithSkeleton
                                    src={detail.image}
                                    alt="Mekan Görseli"
                                    width={100}
                                    height={100}
                                    applyStyle={false}
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500">
                                    <span className="text-2xl">Görsel Yok</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200 flex items-center">
                            <span className="bg-blue-500 w-1 h-5 inline-block mr-2 rounded"></span>
                            Mekan Bilgileri
                        </h2>

                        {detail?.description && (
                            <div className="flex flex-col mb-3">
                                <span className="text-sm font-mediu block mb-1.5">
                                    Açıklama
                                </span>
                                <p className="text-gray-700 leading-relaxed break-all">
                                    {detail.description}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            {detail?.status !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">
                                        Durum
                                    </span>
                                    <div className="flex items-center mt-1">
                                        <div className="h-4 w-4 text-gray-600 mr-1">
                                            <InfoIcon />
                                        </div>
                                        <span className="text-gray-800">
                                            <StatusBadge
                                                status={detail.status}
                                            />
                                        </span>
                                    </div>
                                </div>
                            )}

                            {detail?.createdDate && (
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">
                                        Oluşturulma Tarihi
                                    </span>
                                    <div className="flex items-center mt-1">
                                        <div className="h-4 w-4 text-gray-600 mr-1">
                                            <DateIcon />
                                        </div>
                                        <span className="text-gray-800 break-all">
                                            {formatDateTime(detail.createdDate)}
                                        </span>
                                    </div>
                                </div>
                            )}
                            {detail?.modifiedDate && (
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">
                                        Düzenleme Tarihi
                                    </span>
                                    <div className="flex items-center mt-1">
                                        <div className="h-4 w-4 text-gray-600 mr-1">
                                            <DateIcon />
                                        </div>
                                        <span className="text-gray-800 break-all">
                                            {formatDateTime(
                                                detail.modifiedDate
                                            )}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
