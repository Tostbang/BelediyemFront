'use client';
import { updateInfoMun } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState } from 'react';
import { InfoMuni } from '@/types';
import ImageUploader from '../dynamic/imageUploader';

export default function InfoFormMuni({ detail }: { detail?: InfoMuni | null }) {
    const { handleResult } = useNotificationHandler();

    const initialState = {
        name: detail?.municipalities.name || '',
        phone: detail?.municipalities.phone || '',
        logoImg: detail?.municipalities.logoImg || '',
        url: detail?.municipalities.url || '',
        city: detail?.municipalities.city || '',
        discrit: detail?.municipalities.discrit || '',
        adressline: detail?.municipalities.adressline || '',
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        const result = await updateInfoMun(formData);
        handleResult(result);

        return {
            ...result,
            name: formData.get('name') as string,
            phone: formData.get('phone') as string,
            logoImg: formData.get('logoImg') as string,
            url: formData.get('url') as string,
            city: formData.get('city') as string,
            discrit: formData.get('discrit') as string,
            adressline: formData.get('adressline') as string,
        };
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
            <form action={formAction} className="space-y-6">
                <div className="space-y-5">
                    <ImageUploader
                        name="logoImg"
                        label="Logo"
                        targetWidth={1920}
                        targetHeight={1080}
                        required
                        initialImage={state?.logoImg}
                    />
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Belediye Adı
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
                            Url
                        </label>
                        <input
                            type="text"
                            name="url"
                            placeholder="https://example.com"
                            defaultValue={state?.url}
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
                            Şehir
                        </label>
                        <input
                            type="text"
                            name="city"
                            placeholder="Şehir"
                            defaultValue={state?.city}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            İlçe
                        </label>
                        <input
                            type="text"
                            name="discrit"
                            placeholder="İlçe"
                            defaultValue={state?.discrit}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Adres
                        </label>
                        <textarea
                            name="adressline"
                            defaultValue={state?.adressline}
                            placeholder="Adres"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows={3}></textarea>
                    </div>
                </div>
                <div className="flex justify-end mt-8">
                    <SubmitButton title="Kaydet" />
                </div>
            </form>
        </div>
    );
}
