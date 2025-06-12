'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { BreadcrumbItem, RoleType, StaffUserDetailResponse } from '@/types';
import {
    addStaffMuni,
    addStaffMuniAdmin,
    updateStaffMuni,
    updateStaffMuniAdmin,
} from '@/app/actions';
import { departmans } from '@/data/departmans';
import Breadcrumb from '../common/breadCrumb';

export default function StaffForm({
    id,
    detail,
    breadcrumb,
    type,
}: {
    id?: string | null;
    detail?: StaffUserDetailResponse | null;
    breadcrumb: BreadcrumbItem[];
    type: RoleType;
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;

    const initialState = {
        name: detail?.municipalityStaff.name || '',
        surname: detail?.municipalityStaff.surname || '',
        email: detail?.municipalityStaff.email || '',
        role: detail?.municipalityStaff.role?.toString() || '',
        phone: detail?.municipalityStaff.phone || '',
        password: '',
        status: detail?.municipalityStaff.status || true,
        success: true,
        message: '',
        errors: undefined,
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (isEditing && id) {
            formData.append('id', id);
        }

        let actionFunction;

        switch (type) {
            case 'municipality':
                actionFunction = isEditing ? updateStaffMuni : addStaffMuni;
                break;
            case 'admin-muni':
                actionFunction = isEditing
                    ? updateStaffMuniAdmin
                    : addStaffMuniAdmin;
                break;
            default:
                return {
                    success: false,
                    message: 'Geçersiz işlem türü',
                    name: '',
                    surname: '',
                    email: '',
                    password: '',
                    phone: '',
                    role: '',
                    status: true,
                };
        }

        // Execute action and handle result
        const result = await actionFunction(formData);
        handleResult({
            success: result.success,
            message: result.message,
            errors: result.errors || [],
        });

        const returnState = {
            ...result,
            name: formData.get('name') as string,
            surname: formData.get('surname') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            phone: formData.get('phone') as string,
            role: formData.get('role') as string,
            status: (formData.get('status') as string) === 'on' ? true : false,
        };

        return returnState;
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
                <form action={formAction} className="space-y-6">
                    {/* Common fields for both create and edit */}

                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Personel Adı
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Personel Adı"
                                defaultValue={state?.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Personel Soyadı
                            </label>
                            <input
                                type="text"
                                name="surname"
                                placeholder="Personel Soyadı"
                                defaultValue={state?.surname}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                E-posta
                            </label>
                            <input
                                type="email"
                                name="email"
                                placeholder="E-posta"
                                defaultValue={state?.email}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                GSM
                            </label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="+XX-XXXXXXXXXX"
                                defaultValue={state?.phone}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    {/* Password field only for create mode */}
                    {!isEditing && (
                        <div className="space-y-5">
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Şifre
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Şifre"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Üyelik Tipi
                            </label>
                            <select
                                key={`role-select-${state?.role || 'default'}`}
                                name="role"
                                defaultValue={state?.role}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required>
                                <option value="" disabled>
                                    Üyelik Tipi Seçin
                                </option>
                                {departmans.map((type) => (
                                    <option
                                        key={type.id}
                                        value={type.id.toString()}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {isEditing && (
                        <>
                            <div className="space-y-5">
                                <div className="mb-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="status"
                                            name="status"
                                            defaultChecked={state?.status}
                                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <label
                                            htmlFor="status"
                                            className="ml-2 block text-sm font-medium text-gray-700">
                                            Aktif
                                        </label>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Personelin sistem üzerinde aktif olup
                                        olmadığını belirler
                                    </p>
                                </div>
                            </div>
                        </>
                    )}

                    <div className="flex justify-end mt-8">
                        <SubmitButton
                            title={isEditing ? 'Güncelle' : 'Oluştur'}
                        />
                    </div>
                </form>
            </div>
        </>
    );
}
