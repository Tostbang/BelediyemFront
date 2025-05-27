'use client';
import React from 'react';
import { StaffUserDetailResponse } from '@/types';
import { departmans } from '@/data/departmans';
import { formatDate } from '@/utils';
import LinkButton from '../common/LinkButton';
import ImageWithSkeleton from '../common/imageSkeleton';

export default function StaffDetail({
    id,
    detail,
}: {
    id: string | null;
    detail?: StaffUserDetailResponse | null;
}) {
    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            <div className="space-y-6">
                <div>
                    <div className="flex mb-4">
                        <h1 className="mb-4 text-2xl font-semibold">
                            {detail?.municipalityStaff.name}
                        </h1>
                        <div className="justify-end ml-auto">
                            <LinkButton
                                href={`/municipality/staff/${id}/attented-complaints`}
                                title="Atanan Şikayetler"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center mb-6 md:mb-0">
                            <div className="rounded-full overflow-hidden border-2 border-blue-100 shadow-md">
                                {detail?.municipalityStaff.profileImage ? (
                                    <ImageWithSkeleton
                                        src={
                                            detail.municipalityStaff
                                                .profileImage
                                        }
                                        alt="Personel Fotoğrafı"
                                        width={250}
                                        height={250}
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-12 w-12"
                                            viewBox="0 0 20 20"
                                            fill="currentColor">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-6 h-6 mr-2 flex items-center justify-center text-blue-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            E-posta:
                                        </span>
                                    </div>
                                    <span className="text-gray-700 sm:ml-4 break-all">
                                        {detail?.municipalityStaff.email}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-6 h-6 mr-2 flex items-center justify-center text-blue-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            Telefon:
                                        </span>
                                    </div>
                                    <span className="text-gray-700 sm:ml-4">
                                        {detail?.municipalityStaff.phone}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-6 h-6 mr-2 flex items-center justify-center text-blue-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                                                    clipRule="evenodd"
                                                />
                                                <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            Departman:
                                        </span>
                                    </div>
                                    <span className="text-gray-700 bg-blue-50 py-1 px-3 rounded-full text-sm inline-block sm:ml-4">
                                        {departmans.find(
                                            (item) =>
                                                item.id ===
                                                detail?.municipalityStaff.role
                                        )?.name || '-'}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-6 h-6 mr-2 flex items-center justify-center text-blue-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            Oluşturulma tarihi:
                                        </span>
                                    </div>
                                    <span className="text-gray-700 sm:ml-4">
                                        {formatDate(
                                            detail?.municipalityStaff
                                                .createdDate ?? ''
                                        )}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-6 h-6 mr-2 flex items-center justify-center text-blue-600">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            Değiştirilme tarihi:
                                        </span>
                                    </div>
                                    <span className="text-gray-700 sm:ml-4">
                                        {formatDate(
                                            detail?.municipalityStaff
                                                .modifiedDate ?? ''
                                        )}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
