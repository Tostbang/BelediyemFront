'use client';
import React, { useState, useRef } from 'react';
import {
    BreadcrumbItem,
    RoleType,
    StaffUser,
    StaffUserListResponse,
} from '@/types';
import {
    sendStaffPWMuni,
    sendStaffPWMuniAdmin,
    updateStaffMuniAdmin,
    updateStaffStatusMuni,
} from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePagination } from '@/hooks/usePagination';
import { departmans } from '@/data/departmans';
import LinkButton from '@/components/common/LinkButton';
import DynamicTable from '@/components/dynamic/table';
import ConfirmModal from '@/components/modals/confirmModal';
import Breadcrumb from '../common/breadCrumb';
import SearchFilter from '../filters/searchFilter';
import SelectFilter from '../filters/selectFilter';
import { FilterIcon } from '../icons';
import StatusBadge from '../common/StatusBadge';
import DynamicDropdown from '../common/DynamicDropdown';

export default function StaffList({
    staffList,
    breadcrumb,
    type,
}: {
    staffList: StaffUserListResponse | null;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    const filterParams = ['searchText', 'municipalStaffType'];
    const searchInputRef = useRef<HTMLInputElement>(
        null
    ) as React.RefObject<HTMLInputElement>;

    const {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        handleClearSearch,
        filters,
        handleFilterChange,
    } = usePagination({ filterParams, searchInputRef });

    const [modal, setModal] = useState(false);
    const [modalReset, setModalReset] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

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
            const foundItem = staffList?.municipalStaff.find(
                (item) => item.id.toString() === selectedItem
            );
            let result;

            switch (type) {
                case 'municipality':
                    result = await updateStaffStatusMuni(
                        selectedItem,
                        !foundItem?.status
                    );
                    break;
                case 'admin-muni':
                    if (foundItem) {
                        const formData = new FormData();
                        formData.append('id', foundItem.id.toString());
                        formData.append('name', foundItem.name);
                        formData.append('surname', foundItem.surname);
                        formData.append('email', foundItem.email);
                        formData.append('phone', foundItem.phone);
                        formData.append('role', foundItem.role.toString());
                        formData.append(
                            'status',
                            !foundItem.status ? 'on' : 'false'
                        );
                        result = await updateStaffMuniAdmin(formData);
                    } else {
                        result = {
                            success: false,
                            message: 'Staff member not found',
                        };
                    }
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Geçersiz işlem türü',
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

    const handleConfirmReset = async () => {
        if (selectedItem) {
            let result;

            switch (type) {
                case 'municipality':
                    result = await sendStaffPWMuni(selectedItem);
                    break;
                case 'admin-muni':
                    result = await sendStaffPWMuniAdmin(selectedItem);
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Geçersiz işlem türü',
                    };
            }

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
            title: 'Durum',
            dataIndex: 'status',
            width: 100,
            render: (text: boolean) => <StatusBadge status={text} />,
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
                        className="text-blue-500 hover:text-blue-700 cursor-pointer">
                        Mail Gönder
                    </button>
                </div>
            ),
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            fixed: 'right' as const,
            width: 50,
            render: (_: unknown, record: StaffUser) => {
                const dropdownItems = [
                    {
                        key: 'detail',
                        label: (
                            <Link href={`${url}/${record.id}/detail`}>
                                Detay
                            </Link>
                        ),
                    },
                    {
                        key: 'edit',
                        label: (
                            <Link href={`${url}/${record.id}`}>Düzenle</Link>
                        ),
                    },
                    {
                        key: 'delete',
                        label: 'Durum Değiştir',
                        danger: true,
                        onClick: () => handleDeleteClick(record.id.toString()),
                    },
                ];

                return <DynamicDropdown items={dropdownItems} />;
            },
        },
    ];

    return (
        <>
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    <LinkButton
                        href={`${url}/new`}
                        title="Yeni Personel Ekle"
                    />
                }
            />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 bg-white rounded-lg px-4">
                <div className="flex flex-wrap sm:flex-nowrap items-center w-full lg:w-auto gap-2 sm:gap-0">
                    <div className="w-8 h-8 min-h-8 min-w-8 mt-2 lg:mt-0 flex items-center justify-center sm:justify-start mx-auto sm:mx-0 sm:mr-4">
                        <FilterIcon />
                    </div>

                    <div className="hidden sm:block h-10 lg:h-20 w-px bg-gray-300"></div>
                    <div className="block sm:hidden w-full h-px bg-gray-300"></div>
                    <SelectFilter
                        keyPrefix="membership-select"
                        className="hover:bg-gray-50 cursor-pointer h-10 lg:h-20 w-full sm:w-auto text-sm sm:text-base sm:px-4"
                        value={filters.municipalStaffType?.toString() || ''}
                        onChange={handleFilterChange}
                        placeholder="Departmana Göre"
                        options={departmans}
                        fieldName="municipalStaffType"
                    />
                    <div className="hidden sm:block h-10 lg:h-20 w-px bg-gray-300"></div>
                    <div className="block sm:hidden w-full h-px bg-gray-300"></div>

                    <SearchFilter
                        onClear={handleClearSearch}
                        onFilter={handleSearch}
                        searchInputRef={searchInputRef}
                        searchText={filters.searchText?.toString()}
                    />
                    <div className="hidden sm:block h-10 lg:h-20 w-px bg-gray-300"></div>
                    <div className="block sm:hidden w-full h-px bg-gray-300"></div>
                </div>
                <LinkButton
                    href={`${url}/password-reset-requests`}
                    title="Şifre Sıfırlama Talepleri"
                    className="w-full sm:w-auto mb-4 lg:mb-0"
                />
            </div>
            <div className="flex flex-col items-center w-full mb-6">
                <div className="w-full overflow-hidden bg-white rounded-lg p-6">
                    <div className="overflow-x-auto">
                        <DynamicTable<StaffUser>
                            data={staffList?.municipalStaff || []}
                            columns={columns}
                            rowKey="id"
                            showControls={false}
                            pagination={{
                                pageSize: pageSize,
                                current: pageNumber,
                                total: staffList?.totalCount || 0,
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
                    title="Personel Durum Değiştir"
                    message="Bu kaydın durmunu değiştirmek istediğinize emin misiniz?"
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
        </>
    );
}
