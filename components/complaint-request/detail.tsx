'use client';
import React, { JSX, useState } from 'react';
import { BreadcrumbItem, ComplaintsDetailResponse, RoleType } from '@/types';
import { formatDateTime } from '@/utils';
import {
    BuildingIcon,
    DateIcon,
    EnvelopeIcon,
    PersonIcon,
    PhoneIcon,
    TickIcon,
    XIcon,
} from '../icons';
import Breadcrumb from '../common/breadCrumb';
import { categoryType } from '@/data/categoryType';
import ImageWithSkeleton from '../common/imageSkeleton';
import dynamic from 'next/dynamic';
// Import Swiper and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AttendStaffModal from './attendModal';
import MessageModal from './messageModal';
import { complaintStatusType } from '@/data/complaintStatus';
import { Timeline } from 'antd';
import LinkButton from '../common/LinkButton';
import StatusModal from './statusModal';

// Dynamically import MapPicker with no SSR to avoid leaflet issues
const DynamicMapPicker = dynamic(() => import('../common/mapPicker'), {
    ssr: false,
});

export default function ComplaintDetail({
    id,
    detail,
    breadcrumb,
    type,
}: {
    id: string | null;
    detail?: ComplaintsDetailResponse | null;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    const [staffModal, setStaffModal] = useState(false);
    const [messageModal, setMessageModal] = useState(false);
    const [statusModal, setStatusModal] = useState(false);

    // Define the order of status types to display
    const statusOrder = [1, 2, 3, 4, 5]; // Bekleniyor, İnceleniyor, Ekip Yönlendirildi, Çözüldü, Reddedildi

    // Create a map of existing status types
    const existingStatusTypes = new Set(
        detail?.complaint.complaintsStatus?.map(
            (status) => status.complaintsStatusType
        ) || []
    );

    // Check if rejected or solved statuses exist
    const hasRejectedStatus = existingStatusTypes.has(5);
    const hasSolvedStatus = existingStatusTypes.has(4);

    // Generate timeline items with proper styling
    const timeline = statusOrder
        .map((statusId) => {
            // Skip "Çözüldü" if "Reddedildi" exists, or skip "Reddedildi" if "Çözüldü" exists
            if (
                (statusId === 4 && hasRejectedStatus) ||
                (statusId === 5 && hasSolvedStatus)
            )
                return null;

            const exists = existingStatusTypes.has(statusId);
            const isRejected = statusId === 5;

            const dotColor = exists
                ? isRejected
                    ? 'border-red-500 bg-red-50'
                    : 'border-[#45A200] bg-green-50'
                : 'border-gray-300 bg-gray-50';
            const textColor = exists
                ? isRejected
                    ? 'text-red-500'
                    : 'text-[#45A200]'
                : 'text-gray-400';
            const lineColor = exists
                ? isRejected
                    ? 'red-500'
                    : 'green-500'
                : 'gray-500';

            // Select appropriate icon
            const IconComponent = isRejected ? XIcon : TickIcon;

            return {
                dot: (
                    <div
                        className={`border-2 ${dotColor} rounded-full h-8 w-8 flex items-center justify-center`}>
                        <div className={`w-6 h-6 ${textColor}`}>
                            {exists && <IconComponent />}
                        </div>
                    </div>
                ),
                className: `timeline-item-${lineColor}`,
                children: (
                    <div className="flex flex-col gap-2">
                        <div className={`${textColor} text-base font-medium`}>
                            {
                                complaintStatusType.find(
                                    (item) => item.id === statusId
                                )?.name
                            }
                        </div>
                        {exists &&
                            detail?.complaint.complaintsStatus?.find(
                                (status) =>
                                    status.complaintsStatusType === statusId
                            ) && (
                                <div className="text-gray-500 text-base">
                                    {formatDateTime(
                                        detail?.complaint.complaintsStatus?.find(
                                            (status) =>
                                                status.complaintsStatusType ===
                                                statusId
                                        )?.createdDate || ''
                                    )}
                                </div>
                            )}
                    </div>
                ),
            };
        })
        .filter(
            (
                item
            ): item is {
                dot: JSX.Element;
                className: string;
                children: JSX.Element;
            } => item !== null
        );

    // Add custom CSS for timeline lines
    React.useEffect(() => {
        // Add custom CSS to document head for timeline lines
        const styleElement = document.createElement('style');
        styleElement.innerHTML = `
            .timeline-item-green-500 .ant-timeline-item-tail {
                border-left: 2px solid #45A200 !important;
            }
            .timeline-item-red-500 .ant-timeline-item-tail {
                border-left: 2px solid #EF4444 !important;
            }
            .timeline-item-gray-500 .ant-timeline-item-tail {
                border-left: 2px solid #E3E3E3 !important;
                
            }
            
            /* Make the last item's line invisible */
            .ant-timeline-item:last-child .ant-timeline-item-tail {
                display: none;
            }
        `;
        document.head.appendChild(styleElement);

        // Clean up function to remove the style element when component unmounts
        return () => {
            document.head.removeChild(styleElement);
        };
    }, []);

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="w-full px-4">
                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        {detail?.complaint.title}
                    </h2>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                    <DateIcon />
                                </div>
                                <span className="font-medium text-gray-600">
                                    Tarihi:
                                </span>
                            </div>
                            <span className="text-gray-700">
                                {formatDateTime(
                                    detail?.complaint.createdDate ?? ''
                                )}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <span className="font-medium text-gray-600">
                                    Referans No:
                                </span>
                            </div>
                            <span className="text-gray-700 break-all">
                                # {detail?.complaint.id}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <span className="font-medium text-gray-600">
                                    Kategori:
                                </span>
                            </div>
                            <span className="text-gray-700">
                                {
                                    categoryType.find(
                                        (item) =>
                                            item.id ===
                                            detail?.complaint.categoryType
                                    )?.name
                                }
                            </span>
                        </div>
                        <div className="flex flex-col sm:items-center gap-2">
                            <div className="flex self-start mb-2 sm:mb-0">
                                <span className="font-medium text-gray-600">
                                    Adres:
                                </span>
                            </div>
                            <div className="text-gray-700 w-full">
                                {detail?.complaint.latitude &&
                                    detail?.complaint.longitude && (
                                        <div>
                                            <div className="h-[300px] border rounded-lg overflow-hidden">
                                                <DynamicMapPicker
                                                    value={`https://www.google.com/maps?q=${
                                                        detail.complaint
                                                            .latitude || 0
                                                    },${detail.complaint.longitude || 0}`}
                                                    isReadOnly={true}
                                                />
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 p-8 bg-white rounded-lgs shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Destek Talebi
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2">Konu</h3>
                            <p className="text-gray-700">
                                {detail?.complaint.title}
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2">Mesaj</h3>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {detail?.complaint.title}
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
                            <span className="text-gray-700">
                                {formatDateTime(
                                    detail?.complaint.createdDate ?? ''
                                )}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                        Şikayet Talep Bilgileri
                    </h2>
                    <div className="flex flex-col lg:flex-row lg:gap-6">
                        <div className="lg:w-[70%]">
                            <h3 className="text-lg font-medium mb-2">
                                Açıklama
                            </h3>
                            <p className="text-gray-700 whitespace-pre-wrap">
                                {detail?.complaint.description}
                            </p>
                        </div>

                        <div className="lg:w-[30%] mt-4 lg:mt-0">
                            <h3 className="text-lg font-medium mb-2 lg:hidden">
                                Görseller
                            </h3>
                            <div className="carousel-container rounded-lg overflow-hidden border h-full">
                                <Swiper
                                    modules={[Navigation, Pagination]}
                                    navigation
                                    pagination={{ clickable: true }}
                                    autoplay={{ delay: 5000 }}
                                    className="complaint-images-swiper h-64 w-full">
                                    {detail?.complaint.firstImage && (
                                        <SwiperSlide>
                                            <div className="overflow-hidden rounded-lg w-full h-64">
                                                <ImageWithSkeleton
                                                    src={
                                                        detail.complaint
                                                            .firstImage
                                                    }
                                                    fill
                                                    alt="Şikayet Görseli 1"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    )}
                                    {detail?.complaint.secondImage && (
                                        <SwiperSlide>
                                            <div className="overflow-hidden rounded-lg w-full h-64">
                                                <ImageWithSkeleton
                                                    src={
                                                        detail.complaint
                                                            .secondImage
                                                    }
                                                    fill
                                                    alt="Şikayet Görseli 2"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    )}
                                    {detail?.complaint.thirdImage && (
                                        <SwiperSlide>
                                            <div className="overflow-hidden rounded-lg w-full h-64">
                                                <ImageWithSkeleton
                                                    src={
                                                        detail.complaint
                                                            .thirdImage
                                                    }
                                                    fill
                                                    alt="Şikayet Görseli 3"
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    )}
                                </Swiper>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold mb-6">
                            Şikayet / Talep Durumu
                        </h2>
                        <div className="flex flex-col items-center gap-4 mb-4">
                            <button
                                onClick={() => setStatusModal(true)}
                                className="px-4 py-2 min-w-[200px] bg-blue-600 text-white rounded-lg hover:bg-blue-700 w-full md:w-auto cursor-pointer">
                                Durum Değiştir
                            </button>
                            <LinkButton
                                title="Tüm Durumları Göster"
                                href={`/municipality/complaint-request/${id}/statuses`}
                                className="min-w-[200px]"
                            />
                            <StatusModal
                                isOpen={statusModal}
                                onClose={() => setStatusModal(false)}
                                id={id || ''}
                                type={type}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <Timeline items={timeline} className="px-4 py-2" />
                    </div>
                </div>

                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold mb-6">
                            Kişi Bilgileri
                        </h2>
                        <button
                            onClick={() => setMessageModal(true)}
                            className="px-4 py-2 bg-blue-600 text-white  rounded-lg hover:bg-blue-700 w-full md:w-auto cursor-pointer">
                            Mesaj Gönder
                        </button>
                        <MessageModal
                            isOpen={messageModal}
                            onClose={() => setMessageModal(false)}
                            id={id || ''}
                            type={type}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                    <PersonIcon />
                                </div>
                                <span className="font-medium text-gray-600">
                                    Ad Soyad:
                                </span>
                            </div>
                            <span className="text-gray-700">
                                {detail?.complaint.user?.name}{' '}
                                {detail?.complaint.user?.surname}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                    <EnvelopeIcon />
                                </div>
                                <span className="font-medium text-gray-600">
                                    E-posta:
                                </span>
                            </div>
                            <span className="text-gray-700 break-all">
                                {detail?.complaint.user?.email}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                            <div className="flex items-center mb-2 sm:mb-0">
                                <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                    <PhoneIcon />
                                </div>
                                <span className="font-medium text-gray-600">
                                    Telefon:
                                </span>
                            </div>
                            <span className="text-gray-700">
                                {detail?.complaint.user?.phone}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="mb-6 p-8 bg-white rounded-lg shadow-md">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold mb-6">
                            Personel Bilgileri
                        </h2>
                        <button
                            onClick={() => setStaffModal(true)}
                            className="px-4 py-2 bg-blue-600 text-white  rounded-lg hover:bg-blue-700 w-full md:w-auto cursor-pointer">
                            Personel Yönlendir
                        </button>
                        <AttendStaffModal
                            isOpen={staffModal}
                            onClose={() => setStaffModal(false)}
                            id={id || ''}
                            type={type}
                        />
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                            <div className="flex items-center">
                                {detail?.complaint.assignedStaff
                                    ?.profileImage ? (
                                    <div className="h-16 w-16 relative rounded-full overflow-hidden">
                                        <ImageWithSkeleton
                                            src={
                                                detail.complaint.assignedStaff
                                                    .profileImage
                                            }
                                            alt="Personel Görseli"
                                            width={64}
                                            height={64}
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-100 text-gray-500">
                                        <PersonIcon />
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                            <PersonIcon />
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            Ad Soyad:
                                        </span>
                                    </div>
                                    <span className="text-gray-700">
                                        {detail?.complaint.assignedStaff?.name}{' '}
                                        {
                                            detail?.complaint.assignedStaff
                                                ?.surname
                                        }
                                    </span>
                                </div>

                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <div className="flex items-center mb-2 sm:mb-0">
                                        <div className="w-4 h-4 mr-2 flex items-center justify-center text-blue-600">
                                            <BuildingIcon />
                                        </div>
                                        <span className="font-medium text-gray-600">
                                            Departman:
                                        </span>
                                    </div>
                                    <span className="text-gray-700 break-all">
                                        {
                                            categoryType.find(
                                                (item) =>
                                                    item.id ===
                                                    detail?.complaint
                                                        .assignedStaff?.role
                                            )?.name
                                        }
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
