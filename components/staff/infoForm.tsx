'use client';
import { updateInfoStaff } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { InfoStaff } from '@/types';
import ImageUploader from '../dynamic/imageUploader';

export default function InfoFormStaff({
    detail,
}: {
    detail?: InfoStaff | null;
}) {
    const { handleResult } = useNotificationHandler();

    const initialState = {
        name: detail?.municipalStaff.name || '',
        surname: detail?.municipalStaff.surname || '',
        profileImage: detail?.municipalStaff.profileImage || '',
        phone: detail?.municipalStaff.phone || '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        const result = await updateInfoStaff(formData);
        handleResult(result);
        return {
            ...result,
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            surname: formData.get('surname') as string,
            profileImage: formData.get('profileImage') as string,
        };
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            <form action={formAction} className="space-y-6">
                <div className="space-y-5">
                    <ImageUploader
                        name="profileImage"
                        label="Logo"
                        targetWidth={1920}
                        targetHeight={1080}
                        required
                        initialImage={state?.profileImage}
                    />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ad
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Belediye Adı"
                            defaultValue={state?.name}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                </div>
                <div className="space-y-5">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Soyad
                        </label>
                        <input
                            type="text"
                            name="surname"
                            placeholder="https://example.com"
                            defaultValue={state?.surname}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+XX-XXXXXXXXXX"
                            defaultValue={state?.phone}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-Posta
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-Posta"
                            disabled
                            defaultValue={detail?.municipalStaff.email}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
                        />
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <SubmitButton title="Kaydet" />
                </div>
            </form>
        </div>
    );
}
