'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { BreadcrumbItem, ContractDetailResponse } from '@/types';
import { updateContractAdmin } from '@/app/actions';
import MarkdownEditor from '../common/editorMarkDown';
import Breadcrumb from '../common/breadCrumb';

export default function ContractForm({
    id,
    detail,
    breadcrumb,
}: {
    id?: string | null;
    detail?: ContractDetailResponse | null;
    breadcrumb: BreadcrumbItem[];
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;

    const initialState = {
        name: detail?.contract.name || '',
        content: detail?.contract.content || '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (isEditing && id) {
            formData.append('id', id);
        }

        // Execute action and handle result
        const result = await updateContractAdmin(formData);
        handleResult(result);
        return {
            ...result,
            name: formData.get('name') as string,
            content: formData.get('content') as string,
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
                                Sözleşme Adı
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Sözleşme Adı"
                                defaultValue={state?.name}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <MarkdownEditor
                            name="content"
                            value={state.content}
                            height={400}
                            preview="live"
                            placeholder="Blog içeriğinizi buraya yazın..."
                            required={true}
                        />
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
