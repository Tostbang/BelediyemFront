'use client';
import React from 'react';
import ImageWithSkeleton from '../common/imageSkeleton';
import { PersonIcon } from '../icons';
import Modal from '../common/modal';
import { Slider } from '@/types';
import { roleType } from '@/data/roleType';

export default function SliderDetail({
    isOpen,
    onClose,
    detail,
}: {
    isOpen: boolean;
    onClose: () => void;
    detail?: Slider;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-6">
                <h1 className="mb-4 text-2xl text-center font-semibold">
                    Görsel
                </h1>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-center mb-6 md:mb-0">
                        <div className="overflow-hidden border-2 border-blue-100 shadow-md rounded-lg w-full h-48 md:h-64">
                            {detail?.image ? (
                                <ImageWithSkeleton
                                    src={detail.image}
                                    alt="Etkinlik Fotoğrafı"
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
                        <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                            Görsel Bilgileri
                        </h2>

                        {detail?.url && (
                            <div className="flex flex-col mb-3">
                                <span className="text-sm font-medium text-gray-500">
                                    Bağlantı URL
                                </span>
                                <a
                                    href={detail.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 hover:underline mt-1 break-all">
                                    {detail.url}
                                </a>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                            {detail?.createdBy && (
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">
                                        Oluşturan ID
                                    </span>
                                    <div className="flex items-center mt-1">
                                        <div className="h-4 w-4 text-gray-600 mr-1">
                                            <PersonIcon />
                                        </div>
                                        <span className="text-gray-800">
                                            {detail.createdBy}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {detail?.createdByRole !== undefined && (
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-gray-500">
                                        Rol
                                    </span>
                                    <div className="flex items-center mt-1">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {roleType.find(
                                                (item) =>
                                                    item.id ===
                                                    detail.createdByRole
                                            )?.name || 'Belirtilmemiş'}
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
