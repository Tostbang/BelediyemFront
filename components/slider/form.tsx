'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { BreadcrumbItem, RoleType, SliderDetailResponse } from '@/types';
import { addSliderMuni, updateSliderMuni } from '@/app/actions';
import Breadcrumb from '../common/breadCrumb';
import ImageUploader from '../dynamic/imageUploader';

export default function SliderForm({
    id,
    detail,
    type,
    breadcrumb,
}: {
    id?: string | null;
    detail?: SliderDetailResponse | null;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;

    const initialState = {
        url: detail?.slider.url || '',
        image: detail?.slider.image || '',
        status: detail?.slider.status || false,
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (isEditing && id) {
            formData.append('id', id);
        }

        let actionFunction;

        switch (type) {
            case 'municipality':
                actionFunction = isEditing ? updateSliderMuni : addSliderMuni;
                break;
            default:
                return {
                    success: false,
                    message: 'Unsupported role type',
                    url: '',
                    image: '',
                    status: false,
                };
        }

        // Execute action and handle result
        const result = await actionFunction(formData);
        handleResult(result);
        return {
            ...result,
            url: formData.get('url') as string,
            image: formData.get('image') as string,
            status: (formData.get('status') as string) === 'on' ? true : false,
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
                            label="Slayt Görseli"
                            targetWidth={1920}
                            targetHeight={1080}
                            required
                            initialImage={state?.image}
                        />
                    </div>
                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Url
                            </label>
                            <input
                                type="text"
                                name="url"
                                placeholder="Url"
                                defaultValue={state?.url}
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
                                Slayt içeriğinin sistem üzerinde aktif olup
                                olmadığını belirler
                            </p>
                        </div>
                    </div>
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
