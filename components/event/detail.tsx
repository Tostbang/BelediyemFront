'use client';
import React from 'react';
import { AnnouncementDetailResponse, BreadcrumbItem } from '@/types';
import LinkButton from '../common/LinkButton';
import ImageWithSkeleton from '../common/imageSkeleton';
import { PersonIcon } from '../icons';
import Breadcrumb from '../common/breadCrumb';

export default function AnnDetail({
    id,
    detail,
    breadcrumb,
}: {
    id: string | null;
    detail?: AnnouncementDetailResponse | null;
    breadcrumb: BreadcrumbItem[];
}) {
    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    <LinkButton
                        href={`/municipality/event/${id}`}
                        title="Düzenle"
                    />
                }
            />
            <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
                <div className="space-y-6">
                    <h1 className="mb-4 text-2xl text-center font-semibold">
                        {detail?.announcementDetail.title}
                    </h1>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center mb-6 md:mb-0">
                            <div className="overflow-hidden border-2 border-blue-100 shadow-md">
                                {detail?.announcementDetail.image ? (
                                    <ImageWithSkeleton
                                        src={detail.announcementDetail.image}
                                        alt="Etkinlik Fotoğrafı"
                                        width={800}
                                        height={300}
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <div className="w-20 flex items-center justify-center h-full bg-gray-100 text-gray-500">
                                        <PersonIcon />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="text-gray-700 sm:ml-4 break-all">
                            {detail?.announcementDetail.description}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
