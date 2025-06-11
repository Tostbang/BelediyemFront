'use client';
import React from 'react';
import { BreadcrumbItem, RoleType, StaffUserDetailResponse } from '@/types';
import { departmans } from '@/data/departmans';
import { formatDate } from '@/utils';
import LinkButton from '../common/LinkButton';
import ImageWithSkeleton from '../common/imageSkeleton';
import {
    BagIcon,
    DateIcon,
    EnvelopeIcon,
    PersonIcon,
    PhoneIcon,
} from '../icons';
import Breadcrumb from '../common/breadCrumb';

export default function StaffDetail({
    id,
    detail,
    breadcrumb,
    type,
}: {
    id: string | null;
    detail?: StaffUserDetailResponse | null;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    let url;
    switch (type) {
        case 'municipality':
            url = '/municipality/staff';
            break;
        case 'admin-muni':
            url = '/adminmunicipality/staff';
            break;
        default:
            url = '';
    }

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    <LinkButton
                        href={`${url}/${id}/attended-complaints`}
                        title="Atanan Şikayetler"
                    />
                }
            />
            <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
                <div className="space-y-6">
                    <h1 className="mb-4 text-2xl font-semibold">
                        {detail?.municipalityStaff.name}
                    </h1>
                    <div className="flex flex-col gap-6">
                        <div className="flex justify-center mb-6 md:mb-0">
                            <div className="rounded-full overflow-hidden border-2 border-gray-100 shadow-md">
                                {detail?.municipalityStaff.profileImage ? (
                                    <ImageWithSkeleton
                                        src={
                                            detail.municipalityStaff
                                                .profileImage
                                        }
                                        alt="Personel Görseli"
                                        width={250}
                                        height={250}
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                ) : (
                                    <div className="w-20 flex items-center justify-center h-full bg-gray-100 text-gray-500">
                                        <PersonIcon />
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="grid grid-cols-1 gap-3">
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
                                        {detail?.municipalityStaff.email}
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
                                        {detail?.municipalityStaff.phone}
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                            <BagIcon />
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
                                        <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                            <DateIcon />
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
                                        <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                            <DateIcon />
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
        </>
    );
}
