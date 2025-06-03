'use client';

import React, { useEffect, useState } from 'react';
import Modal from '../common/modal';
import SubmitButton from '../common/submitButton';
import { attendtComplaintToStaffMuni, getStaffsMuni } from '@/app/actions';
import { RoleType, StaffUser } from '@/types';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { departmans } from '@/data/departmans';

type AttendStaffModalProps = {
    isOpen: boolean;
    onClose: () => void;
    id: string;
    type: RoleType;
};

export default function AttendStaffModal({
    isOpen,
    onClose,
    id,
    type,
}: AttendStaffModalProps) {
    const [selectedDepartment, setSelectedDepartment] = useState<string>('');
    const [selectedStaff, setSelectedStaff] = useState<string>('');
    const [staffList, setStaffList] = useState<StaffUser[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { handleSuccess, handleError } = useNotificationHandler();
    const router = useRouter();

    useEffect(() => {
        const fetchStaff = async () => {
            if (!selectedDepartment) {
                setStaffList([]);
                return;
            }
            setIsLoading(true);
            try {
                const response = await getStaffsMuni({
                    pageNumber: 0,
                    pageSize: 100,
                    municipalStaffType: parseInt(selectedDepartment),
                });

                if (response && response.municipalStaff) {
                    setStaffList(response.municipalStaff);
                }
            } catch (error) {
                console.error('Error fetching staff:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStaff();
    }, [selectedDepartment]);

    const handleCancel = () => {
        setSelectedDepartment('');
        setSelectedStaff('');
        onClose();
    };

    const handleConfirm = async () => {
        if (id && selectedStaff) {
            let result;
            switch (type) {
                case 'municipality':
                    result = await attendtComplaintToStaffMuni(
                        id,
                        selectedStaff
                    );
                    break;
                default:
                    result = {
                        success: false,
                        message: 'Unsupported role type',
                    };
            }

            if (result.success) {
                handleSuccess(result.message);
                handleCancel();
                router.refresh();
            } else {
                handleError(result);
                handleCancel();
            }
        } else {
            handleError({
                message: 'Lütfen bir personel seçin.',
                errors: 'Personel seçilmedi.',
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="space-y-4">
                <form action={handleConfirm}>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Personel Yönlendir
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label
                                htmlFor="department"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Departman Seçin
                            </label>
                            <select
                                id="department"
                                name="department"
                                value={selectedDepartment}
                                onChange={(e) =>
                                    setSelectedDepartment(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required>
                                <option value="">Departman Seçin</option>
                                {departmans.map((dept) => (
                                    <option
                                        key={dept.id}
                                        value={dept.id.toString()}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label
                                htmlFor="staff"
                                className="block text-sm font-medium text-gray-700 mb-1">
                                Personel Seçin
                            </label>
                            <select
                                id="staff"
                                name="staff"
                                value={selectedStaff}
                                onChange={(e) =>
                                    setSelectedStaff(e.target.value)
                                }
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={isLoading || !selectedDepartment}
                                required>
                                <option value="">
                                    {isLoading
                                        ? 'Yükleniyor...'
                                        : !selectedDepartment
                                          ? 'Önce departman seçin'
                                          : 'Personel Seçin'}
                                </option>
                                {staffList.map((staff) => (
                                    <option key={staff.id} value={staff.id}>
                                        {staff.name} {staff.surname}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            onClick={handleCancel}>
                            İptal
                        </button>
                        <SubmitButton title="Görevlendir" />
                    </div>
                </form>
            </div>
        </Modal>
    );
}
