'use client';
import React, { useState, useRef } from 'react';
import { StaffUser, StaffUserListResponse } from '@/types';
import { updateMuniStatusAdmin } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { Dropdown } from 'antd';
import Link from 'next/link';
import { MoreOutlined } from '@ant-design/icons';
import { usePagination } from '@/hooks/usePagination';
import { departmans } from '@/data/departmans';
import LinkButton from '@/components/common/LinkButton';
import DynamicTable from '@/components/dynamic/table';
import ConfirmModal from '@/components/modals/confirmModal';
import { SearchIcon, TrashIcon } from '../icons';

export default function StaffList({
    staffList,
}: {
    staffList: StaffUserListResponse;
}) {
    const {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        searchText,
        type,
        handleSearchTextChange,
        handleTypeChange,
        handleClearSearch,
    } = usePagination();
    const [modal, setModal] = useState(false);
    const [modalReset, setModalReset] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();
    const searchInputRef = useRef<HTMLInputElement>(null);

    const handleDeleteClick = (id: string) => {
        setSelectedItem(id);
        setModal(true);
    };

    const handleResetPassword = (id: string) => {
        setSelectedItem(id);
        setModalReset(true);
    };

    const handleConfirm = async () => {
        if (selectedItem) {
            const result = await updateMuniStatusAdmin(selectedItem, false);
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

    const handleConfirmReset = async () => {
        if (selectedItem) {
            const result = await updateMuniStatusAdmin(selectedItem, false);
            if (result.success) {
                handleSuccess(result.message);
                setModalReset(false);
                router.refresh();
            } else {
                handleError(result);
                setModalReset(false);
            }
        }
    };

    const handleSearch = () => {
        if (searchInputRef.current) {
            handleSearchTextChange(searchInputRef.current.value);
        }
    };

    const clearFilters = () => {
        handleClearSearch();
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: 180,
        },
        {
            title: 'Personel',
            dataIndex: 'name',
            fixed: 'left' as const,
            width: 180,
            render: (text: string, record: StaffUser) =>
                text + ' ' + record.surname,
        },
        {
            title: 'E-posta',
            dataIndex: 'email',
            width: 180,
        },
        {
            title: 'Telefon',
            dataIndex: 'phone',
            width: 180,
        },
        {
            title: 'Departman',
            dataIndex: 'role',
            width: 100,
            render: (value: number) =>
                departmans.find((item) => item.id === value)?.name,
        },
        {
            title: 'Şifre Sırfılama',
            dataIndex: 'action_reset',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: StaffUser) => (
                <div>
                    <button
                        onClick={() =>
                            handleResetPassword(record.id.toString())
                        }
                        className="text-red-500 hover:text-red-700 cursor-pointer">
                        Sıfırla
                    </button>
                </div>
            ),
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: StaffUser) => (
                <Dropdown
                    menu={{
                        items: [
                            {
                                key: 'detail',
                                label: (
                                    <Link
                                        href={`/municipality/staff/${record.id}/detail`}>
                                        Detay
                                    </Link>
                                ),
                            },
                            {
                                key: 'edit',
                                label: (
                                    <Link
                                        href={`/municipality/staff/${record.id}`}>
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
        <div className="flex flex-col items-center w-full mb-6">
            <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                <div className="flex justify-end mb-4">
                    <LinkButton
                        href="/municipality/staff/new"
                        title="Yeni Personel Ekle"
                    />
                </div>
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                    <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 w-full lg:w-auto">
                        <select
                            key={`membership-select-${type || 'default'}`}
                            className="border border-gray-300 rounded p-2 w-full sm:w-auto"
                            value={type}
                            onChange={(e) => handleTypeChange(e.target.value)}>
                            <option value="">Tüm Departmanlar</option>
                            {departmans.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="flex items-center w-full sm:w-auto">
                            <input
                                type="text"
                                placeholder="Arama..."
                                defaultValue={searchText}
                                ref={searchInputRef}
                                className="border border-gray-300 border-r-transparent rounded-l p-2 flex-grow w-full sm:w-64"
                            />
                            <div className="flex items-center">
                                <button
                                    onClick={handleSearch}
                                    className="border border-gray-300 border-r-0 flex items-center cursor-pointer justisfy-center bg-blue-500 hover:bg-blue-600 text-white p-2 h-full min-w-[40px]">
                                    <SearchIcon />
                                </button>
                                <button
                                    onClick={clearFilters}
                                    className="border border-y-gray-300 border-l-0 border-r-gray-300  flex items-center cursor-pointer justify-center bg-red-500 hover:bg-red-600 text-white p-2 h-full min-w-[40px] rounded-r">
                                    <TrashIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto">
                        <LinkButton
                            href="/municipality/staff/password-reset-requests"
                            title="Şifre Sıfırlama Talepleri"
                            className="w-full sm:w-auto"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <DynamicTable<StaffUser>
                        data={staffList.municipalStaff}
                        columns={columns}
                        rowKey="id"
                        showControls={false}
                        pagination={{
                            pageSize: pageSize,
                            current: pageNumber,
                            total: staffList.totalCount || 0,
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
                title="Personel Sil"
                message="Bu kaydı silmek istediğinize emin misiniz? Bu işlem geri alınamaz."
                onConfirm={handleConfirm}
            />
            <ConfirmModal
                isOpen={modalReset}
                onClose={() => setModalReset(false)}
                title="Şifre Sıfırla"
                message="Şifre sıfırlama işlemi, personelin mevcut şifresini sıfırlayacak ve yeni bir şifre oluşturacaktır. Devam etmek istediğinize emin misiniz?"
                onConfirm={handleConfirmReset}
            />
        </div>
    );
}
