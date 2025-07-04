'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { BreadcrumbItem, FacilityDetailResponse, RoleType } from '@/types';
import {
    addFacilityMuni,
    addFacilityMuniAdmin,
    updateFacilityMuni,
    updateFacilityMuniAdmin,
} from '@/app/actions';
import Breadcrumb from '../common/breadCrumb';
import ImageUploader from '../dynamic/imageUploader';
import MapModal from '../modals/mapModal';

export default function FacilityForm({
    id,
    detail,
    type,
    breadcrumb,
}: {
    id?: string | null;
    detail?: FacilityDetailResponse | null;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;

    const initialState = {
        title: detail?.facility.title || '',
        description: detail?.facility.description || '',
        image: detail?.facility.image || '',
        latitude: detail?.facility.latitude || '',
        longitude: detail?.facility.longitude || '',
        address: detail?.facility.address || '',
        status: isEditing ? (detail?.facility.status ?? true) : true,
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
                    ? updateFacilityMuni
                    : addFacilityMuni;
                break;
            case 'admin-muni':
                actionFunction = isEditing
                    ? updateFacilityMuniAdmin
                    : addFacilityMuniAdmin;
                break;
            default:
                return {
                    success: false,
                    message: 'Geçersiz işlem türü',
                    title: '',
                    image: '',
                    latitude: '',
                    longitude: '',
                    description: '',
                    address: '',
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
            image: formData.get('image') as string,
            description: formData.get('description') as string,
            address: formData.get('address') as string,
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
                        <ImageUploader
                            name="image"
                            label="Tesis Görseli"
                            targetWidth={1920}
                            targetHeight={1080}
                            required
                            initialImage={state?.image}
                        />
                    </div>
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
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Açıklama
                            </label>
                            <textarea
                                rows={3}
                                name="description"
                                placeholder="Açıklama"
                                defaultValue={state?.description}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Adres
                            </label>
                            <textarea
                                rows={3}
                                name="address"
                                placeholder="Adres"
                                defaultValue={state?.address}
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
                                Tesis içeriğinin sistem üzerinde aktif olup
                                olmadığını belirler
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
