'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { BreadcrumbItem, FAQDetail, RoleType } from '@/types';
import {
    addFAQAdmin,
    addFAQMuni,
    updateFAQAdmin,
    updateFAQMuni,
} from '@/app/actions';
import Breadcrumb from '../common/breadCrumb';

export default function FaqForm({
    id,
    detail,
    type,
    breadcrumb,
}: {
    id?: string | null;
    detail?: FAQDetail | null;
    type: RoleType;
    breadcrumb: BreadcrumbItem[];
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;

    const initialState = {
        title: detail?.frequentlyAsked.title || '',
        description: detail?.frequentlyAsked.description || '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (isEditing && id) {
            formData.append('id', id);
        }

        let actionFunction;

        switch (type) {
            case 'admin':
                actionFunction = isEditing ? updateFAQAdmin : addFAQAdmin;
                break;
            case 'municipality':
                actionFunction = isEditing ? updateFAQMuni : addFAQMuni;
                break;
            default:
                return {
                    success: false,
                    message: 'Unsupported role type',
                    title: formData.get('title') as string,
                    description: formData.get('description') as string,
                };
        }

        // Execute action and handle result
        const result = await actionFunction(formData);
        handleResult(result);
        return {
            ...result,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
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
                                Soru
                            </label>
                            <input
                                type="text"
                                name="title"
                                placeholder="Soru"
                                defaultValue={state?.title}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cevap
                            </label>
                            <input
                                type="text"
                                name="description"
                                placeholder="Cevap"
                                defaultValue={state?.description}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
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
