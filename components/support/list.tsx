'use client';
import React, { useRef, useState } from 'react';
import { BreadcrumbItem, RoleType, Support, SupportResponse } from '@/types';
import ConfirmModal from '../modals/confirmModal';
import {
    forwardSupportToAdminMuni,
    rejecetSupportMuni,
    rejecetSupportMuniAdmin,
} from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '../common/breadCrumb';
import DynamicTable from '../dynamic/table';
import { usePagination } from '@/hooks/usePagination';
import { formatDateTime } from '@/utils';
import DynamicDropdown from '../common/DynamicDropdown';
import { supportType } from '@/data/supportType';
import ReplyModal from './replyModal';
import SearchFilter from '../filters/searchFilter';

export default function SupportList({
    supports,
    type,
    breadcrumb,
}: {
    supports: SupportResponse;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const filterParams = ['searchText'];

    const searchInputRef = useRef<HTMLInputElement>(
        null
    ) as React.RefObject<HTMLInputElement>;

    const {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        filters,
        handleSearch,
        handleClearSearch,
    } = usePagination({ filterParams, searchInputRef });
    const [modal, setModal] = useState(false);
    const [forwardModal, setForwardModal] = useState(false);
    const [rejectModal, setRejectModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    const handleReplyClick = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleForwardClick = (id: string) => {
        setSelectedItem(id);
        setForwardModal(true);
    };

    const handleRejectClick = (id: string) => {
        setSelectedItem(id);
        setRejectModal(true);
    };

    const handleForwardConfirm = async () => {
        if (selectedItem) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await forwardSupportToAdminMuni(selectedItem);
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
        if (selectedItem) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await rejecetSupportMuni(selectedItem);
                    break;
                case 'admin-muni':
                    result = await rejecetSupportMuniAdmin(selectedItem);
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

    let url;
    switch (type) {
        case 'municipality':
            url = '/municipality/support';
            break;
        case 'admin-muni':
            url = '/adminmunicipality/support';
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
            title: 'Başlık',
            dataIndex: 'name',
            width: 180,
            render: (text: string, record: Support) =>
                text + ' ' + record.surname,
        },
        {
            title: 'E-Posta',
            dataIndex: 'email',
            width: 180,
        },
        {
            title: 'Başlık',
            dataIndex: 'title',
            width: 180,
        },
        {
            title: 'Mesaj',
            dataIndex: 'message',
            width: 180,
        },
        {
            title: 'Oluşturma Tarihi',
            dataIndex: 'createdDate',
            width: 180,
            render: (text: string) => formatDateTime(text),
        },
        {
            title: 'Durum',
            dataIndex: 'supportStatusType',
            width: 180,
            render: (value: number) => {
                const status = supportType.find((item) => item.id === value);

                return (
                    <span
                        className={`${status ? status.bgColor : 'bg-gray-500'} p-1 px-4 rounded-2xl  text-white text-center w-fit`}>
                        {status?.name || 'Bilinmiyor'}
                    </span>
                );
            },
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: Support) => {
                const dropdownItems = [
                    {
                        key: 'detail',
                        label: <Link href={`${url}/${record.id}`}>Detay</Link>,
                    },
                    {
                        key: 'reply',
                        label: <div className="text-green-600">Yanıtla</div>,
                        onClick: () => handleReplyClick(record.id.toString()),
                    },
                    {
                        key: 'forward',
                        label: (
                            <div className="text-blue-600 ">Admine İlet</div>
                        ),
                        onClick: () => handleForwardClick(record.id.toString()),
                        show: type !== 'municipality',
                    },
                    {
                        key: 'reject',
                        label: <div className="text-red-600 ">Reddet</div>,
                        onClick: () => handleRejectClick(record.id.toString()),
                    },
                ];

                return <DynamicDropdown items={dropdownItems} />;
            },
        },
    ];

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 bg-white rounded-lg px-4">
                <div className="flex flex-col items-center w-full mb-6">
                    <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                                <SearchFilter
                                    onClear={handleClearSearch}
                                    onFilter={handleSearch}
                                    searchInputRef={searchInputRef}
                                    searchText={filters.searchText?.toString()}
                                />
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <DynamicTable<Support>
                                data={supports.supports}
                                columns={columns}
                                rowKey="id"
                                showControls={false}
                                pagination={{
                                    pageSize: pageSize,
                                    current: pageNumber,
                                    total: supports.totalCount || 0,
                                    onChange: handlePageChange,
                                    onShowSizeChange: handlePageSizeChange,
                                    responsive: true,
                                    size: 'default',
                                }}
                            />
                        </div>
                    </div>
                    {/* Reply modal */}
                    <ReplyModal
                        isOpen={modal}
                        onClose={() => setModal(false)}
                        id={selectedItem || ''}
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
        </>
    );
}
