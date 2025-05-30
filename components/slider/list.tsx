'use client';
import React, { useState } from 'react';
import { BreadcrumbItem, RoleType, Slider, SliderResponse } from '@/types';
import ConfirmModal from '../modals/confirmModal';
import { deleteSliderMuni } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'antd';
import Link from 'next/link';
import LinkButton from '../common/LinkButton';
import Breadcrumb from '../common/breadCrumb';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';
import ImageWithSkeleton from '../common/imageSkeleton';
import { formatDateTime } from '@/utils';
import StatusBadge from '../common/StatusBadge';
import { MoreOutlined } from '@ant-design/icons';
import SliderDetail from './detail';
import { roleType } from '@/data/roleType';

export default function SlaytList({
    sliders,
    type,
    breadcrumb,
}: {
    sliders: SliderResponse;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const { pageNumber, pageSize, handlePageChange, handlePageSizeChange } =
        usePagination({});
    const [modal, setModal] = useState(false);
    const [detailsModal, setDetailsModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleDeleteClick = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleDetailClick = (id: string) => {
        setSelectedItem(id);
        setDetailsModal(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await deleteSliderMuni(selectedItem);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Unsupported role type',
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

    let url;
    switch (type) {
        case 'municipality':
            url = '/municipality/slider';
            break;
        default:
            url = '';
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 180,
            fixed: 'left' as const,
        },
        {
            title: 'Fotoğraf',
            dataIndex: 'image',
            width: 180,
            render: (value: string) => {
                return value ? (
                    <ImageWithSkeleton
                        src={value}
                        alt="Slayt Fotoğrafı"
                        width={80}
                        height={80}
                        className="object-cover w-full h-full rounded-full"
                    />
                ) : (
                    <div className="w-20 flex items-center justify-center h-full bg-gray-100 text-gray-500 rounded-full">
                        <span className="text-2xl">Görsel Yok</span>
                    </div>
                );
            },
        },
        {
            title: 'Ekleyen',
            dataIndex: 'createdByRole',
            width: 180,
            render: (value: number) =>
                roleType.find((item) => item.id === value)?.name,
        },
        {
            title: 'Tarih',
            dataIndex: 'createdDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
        {
            title: 'Durum',
            dataIndex: 'status',
            width: 180,
            render: (text: boolean) => <StatusBadge status={text} />,
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: Slider) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'detail',
                                label: 'Detay',
                                onClick: () =>
                                    handleDetailClick(record.id.toString()),
                            },
                            {
                                key: 'edit',
                                label: (
                                    <Link
                                        href={`/municipality/slider/${record.id}`}>
                                        Düzenle
                                    </Link>
                                ),
                            },
                            {
                                key: 'delete',
                                label: 'Sil',
                                danger: true,
                                onClick: () =>
                                    handleDeleteClick(record.id.toString()),
                            },
                        ],
                    }}>
                    <a onClick={(e) => e.preventDefault()} className="text-2xl">
                        <MoreOutlined />
                    </a>
                </Dropdown>
            ),
        },
    ];

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    <LinkButton href={`${url}/new`} title="Yeni Slayt Ekle" />
                }
            />
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden">
                   
                    <div className="overflow-x-auto">
                        <DynamicTable<Slider>
                            data={sliders.sliders}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: sliders.totalCount || 0,
                                onChange: handlePageChange,
                                onShowSizeChange: handlePageSizeChange,
                                responsive: true,
                                size: 'default',
                            }}
                        />
                    </div>
                </div>
                <ConfirmModal
                    isOpen={modal}
                    onClose={() => setModal(false)}
                    title="SSS Sil"
                    message="Bu içeriği silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                    onConfirm={handleConfirm}
                />
                <SliderDetail
                    isOpen={detailsModal}
                    onClose={() => setDetailsModal(false)}
                    detail={sliders.sliders.find(
                        (item) => item.id.toString() === selectedItem
                    )}
                />
            </div>
        </>
    );
}
