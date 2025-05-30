'use client';
import React from 'react';
import { Announcement } from '@/types';
import ImageWithSkeleton from '../common/imageSkeleton';
import Modal from '../common/modal';

export default function AnnDetail({
    isOpen,
    onClose,
    detail,
}: {
    detail?: Announcement | null;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-6">
                <h1 className="mb-4 text-2xl text-center font-semibold">
                    Görsel
                </h1>
                <div className="flex flex-col gap-6">
                    <div className="flex justify-center mb-6 md:mb-0">
                        <div className="overflow-hidden border-2 border-gray-100 shadow-md rounded-lg w-full h-48 md:h-64">
                            {detail?.image ? (
                                <ImageWithSkeleton
                                    src={detail.image}
                                    alt="Etkinlik Görseli"
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
                            Etkinlik Bilgileri
                        </h2>

                        {detail?.description && (
                            <div className="flex flex-col mb-3">
                                <span className="text-sm font-medium text-gray-500">
                                    Açıklama
                                </span>
                                <p className="text-gray-700 leading-relaxed break-all">
                                    {detail.description}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Modal>
    );
}
