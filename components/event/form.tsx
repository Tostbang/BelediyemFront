'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { AnnouncementDetailResponse } from '@/types';
import { annType } from '@/data/annType';
import ImageUploader from '../dynamic/imageUploader';
import { addAnnfMuni, updateAnnMuni } from '@/app/actions/municipality/ann';

export default function EventForm({
    id,
    detail,
}: {
    id?: string | null;
    detail?: AnnouncementDetailResponse | null;
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;

    const initialState = {
        title: detail?.announcement.title || '',
        description: detail?.announcement.description || '',
        image: detail?.announcement.image || '',
        announcementsType: detail?.announcement.announcementsType || '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (isEditing && id) {
            formData.append('id', id);
        }

        const actionFunction = isEditing ? updateAnnMuni : addAnnfMuni;

        // Execute action and handle result
        const result = await actionFunction(formData);
        handleResult(result);

        const returnState = {
            ...result,
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            image: formData.get('image') as string,
            announcementsType: formData.get('announcementsType') as string,
        };

        return returnState;
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            <form action={formAction} className="space-y-6">
                <div className="space-y-5">
                    <div className="mb-4">
                        <ImageUploader
                            name="image"
                            label="İçerik Görseli"
                            targetWidth={1920}
                            targetHeight={1080}
                            required
                            initialImage={state?.image}
                        />
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            İçerik Türü
                        </label>
                        <select
                            key={`ann-select-${state?.announcementsType || 'default'}`}
                            name="announcementsType"
                            defaultValue={state?.announcementsType}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required>
                            <option value="" disabled>
                                İçerik Türü
                            </option>
                            {annType.map((type) => (
                                <option
                                    key={type.id}
                                    value={type.id.toString()}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>
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
                <div className="flex justify-end mt-8">
                    <SubmitButton title={isEditing ? 'Güncelle' : 'Oluştur'} />
                </div>
            </form>
        </div>
    );
}
