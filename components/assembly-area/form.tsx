'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { AssemblyDetailResponse, BreadcrumbItem, RoleType } from '@/types';
import {
    addAssemblyMuni,
    addAssemblyMuniAdmin,
    updateAssemblyMuni,
    updateAssemblyMuniAdmin,
} from '@/app/actions';
import Breadcrumb from '../common/breadCrumb';
import MapModal from '../modals/mapModal';

export default function AssemblyForm({
    id,
    detail,
    type,
    breadcrumb,
}: {
    id?: string | null;
    detail?: AssemblyDetailResponse | null;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;

    const initialState = {
        title: detail?.assemblyArea.title || '',
        latitude: detail?.assemblyArea.latitude || '',
        longitude: detail?.assemblyArea.longitude || '',
        status: isEditing ? (detail?.assemblyArea.status ?? true) : true,
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
                actionFunction = isEditing
                    ? updateAssemblyMuni
                    : addAssemblyMuni;
                break;
            case 'admin-muni':
                actionFunction = isEditing
                    ? updateAssemblyMuniAdmin
                    : addAssemblyMuniAdmin;
                break;
            default:
                return {
                    success: false,
                    message: 'Geçersiz işlem türü',
                    title: '',
                    latitude: '',
                    longitude: '',
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
        return {
            ...result,
            title: formData.get('title') as string,
            status: (formData.get('status') as string) === 'on' ? true : false,
            latitude: formData.get('latitude') as string,
            longitude: formData.get('longitude') as string,
        };
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
                <form action={formAction} className="space-y-6">
                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Başlık
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Başlık"
                                defaultValue={state?.title}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
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
                                Toplanma alanı içeriğinin sistem üzerinde aktif
                                olup olmadığını belirler
                            </p>
                        </div>
                    </div>

                    {/* Hidden inputs for form submission */}
                    <input
                        type="hidden"
                        id="latitude"
                        name="latitude"
                        defaultValue={state?.latitude || ''}
                    />
                    <input
                        type="hidden"
                        id="longitude"
                        name="longitude"
                        defaultValue={state?.longitude || ''}
                    />

                    {/* Map Modal Component */}
                    <MapModal
                        initialLatitude={state?.latitude || ''}
                        initialLongitude={state?.longitude || ''}
                    />

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
