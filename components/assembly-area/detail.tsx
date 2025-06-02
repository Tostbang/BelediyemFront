'use client';
import React from 'react';
import { DateIcon, InfoIcon } from '../icons';
import Modal from '../common/modal';
import { Assembly } from '@/types';
import StatusBadge from '../common/StatusBadge';
import { formatDateTime } from '@/utils';
import dynamic from 'next/dynamic';

// Dynamically import MapPicker with no SSR to avoid leaflet issues
const DynamicMapPicker = dynamic(() => import('../common/mapPicker'), {
    ssr: false,
});

export default function AssemblyDetail({
    isOpen,
    onClose,
    detail,
}: {
    isOpen: boolean;
    onClose: () => void;
    detail?: Assembly;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <h1 className="mb-2 text-xl text-center font-semibold break-all">
                    {detail?.title}
                </h1>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200 flex items-center">
                        <span className="bg-blue-500 w-1 h-5 inline-block mr-2 rounded"></span>
                        Mekan Bilgileri
                    </h2>

                    {/* Map section */}
                    {detail?.latitude && detail?.longitude && (
                        <div>
                            <h3 className="text-sm font-medium text-gray-800 mb-2">
                                Konum Bilgisi
                            </h3>
                            <div className="h-[200px] border rounded-lg overflow-hidden">
                                <DynamicMapPicker
                                    value={`https://www.google.com/maps?q=${
                                        detail.latitude || 0
                                    },${detail.longitude || 0}`}
                                    isReadOnly={true}
                                />
                            </div>
                        </div>
                    )}

                    {/* Status and dates section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
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
                                        <StatusBadge status={detail.status} />
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
                                        {formatDateTime(detail.modifiedDate)}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
