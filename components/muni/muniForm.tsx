'use client';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import SubmitButton from '@/components/common/submitButton';
import React, { useActionState, useState } from 'react';
import { BreadcrumbItem, MuniDetailResponse } from '@/types';
import { addMuniAdmin, updateMuniAdmin } from '@/app/actions';
import { membershipTypes } from '@/data/membershipType';
import ImageUploader from '../dynamic/imageUploader';
import { formatDateInput } from '@/utils';
import Breadcrumb from '../common/breadCrumb';
import { setCookie } from '@/app/actions/cookies';
import { useRouter } from 'next/navigation';

export default function MuniForm({
    id,
    detail,
    breadcrumb,
}: {
    id?: string | null;
    detail?: MuniDetailResponse | null;
    breadcrumb: BreadcrumbItem[];
}) {
    const { handleResult } = useNotificationHandler();
    const isEditing = !!id;
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleSwitchToMunicipalityPanel = async () => {
        if (id) {
            setIsTransitioning(true);
            await setCookie('municipalityId', id);
            setTimeout(() => {
                router.push('/adminmunicipality/dashboard');
            }, 1000);
        } else {
            handleResult({
                success: false,
                message:
                    'Belediye ID bulunamadı. Lütfen önce belediye kaydını tamamlayın.',
            });
        }
    };

    const initialState = {
        name: detail?.municipality.name || '',
        email: detail?.municipality.email || '',
        password: '',
        phone: detail?.municipality.phone || '',
        membershipType: detail?.municipality.membershipType?.toString() || '',
        landlinePhone: detail?.municipality.landlinePhone || '',

        logoImg: detail?.municipality.logoImg || '',
        url: detail?.municipality.url || '',
        membershipStartDate: detail?.municipality.membershipStartDate || '',
        membershipEndDate: detail?.municipality.membershipEndDate || '',
        city: detail?.municipality.city || '',
        discrit: detail?.municipality.discrit || '',
        adressline: detail?.municipality.adressline || '',
        status: detail?.municipality.status || false,
    };

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (isEditing && id) {
            formData.append('id', id);
        }

        const actionFunction = isEditing ? updateMuniAdmin : addMuniAdmin;

        // Execute action and handle result
        const result = await actionFunction(formData);
        handleResult(result);

        const returnState = {
            ...result,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            phone: formData.get('phone') as string,
            landlinePhone: formData.get('landlinePhone') as string,
            membershipType: formData.get('membershipType') as string,
            logoImg: formData.get('logoImg') as string,
            url: formData.get('url') as string,
            membershipStartDate: formData.get('membershipStartDate') as string,
            membershipEndDate: formData.get('membershipEndDate') as string,
            city: formData.get('city') as string,
            discrit: formData.get('discrit') as string,
            adressline: formData.get('adressline') as string,
            status: (formData.get('status') as string) === 'on' ? true : false,
        };

        return returnState;
    };

    const [state, formAction] = useActionState(clientAction, initialState);

    return (
        <>
            {isTransitioning && (
                <div className="fixed inset-0 bg-blue-900/80 backdrop-blur-sm z-50 flex justify-center items-center transition-all duration-300 ease-in-out">
                    <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center transform scale-up">
                        <div className="w-20 h-20 border-t-4 border-b-4 border-blue-600 rounded-full animate-spin mb-4"></div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">
                            Belediye Paneline Geçiliyor
                        </h2>
                        <p className="text-gray-600">Lütfen bekleyiniz...</p>
                    </div>
                </div>
            )}
            <Breadcrumb
                breadcrumb={breadcrumb}
                buttonComponent={
                    isEditing ? (
                        <button
                            type="button"
                            onClick={handleSwitchToMunicipalityPanel}
                            disabled={isTransitioning}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed">
                            Belediye Paneline Geç
                        </button>
                    ) : null
                }
            />
            <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
                <form action={formAction} className="space-y-6">
                    {/* Common fields for both create and edit */}

                    {isEditing && (
                        <div className="space-y-5">
                            <div className="mb-4">
                                <ImageUploader
                                    name="logoImg"
                                    label="Logo"
                                    targetWidth={1920}
                                    targetHeight={1080}
                                    required
                                    initialImage={state?.logoImg}
                                />
                            </div>
                        </div>
                    )}

                    <div className="space-y-5">
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

                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sabit Telefon
                            </label>
                            <input
                                type="text"
                                name="landlinePhone"
                                placeholder="(0 XXX) XXX XX XX"
                                defaultValue={state?.landlinePhone}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Üyelik Tipi
                            </label>
                            <select
                                key={`membership-select-${state?.membershipType || 'default'}`}
                                name="membershipType"
                                defaultValue={state?.membershipType}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required>
                                <option value="" disabled>
                                    Üyelik Tipi Seçin
                                </option>
                                {membershipTypes.map((type) => (
                                    <option
                                        key={type.id}
                                        value={type.id.toString()}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Additional fields only for edit mode */}
                    {isEditing && (
                        <>
                            <div className="space-y-5">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Website URL
                                    </label>
                                    <input
                                        type="text"
                                        name="url"
                                        placeholder="Website URL"
                                        defaultValue={state?.url}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Üyelik Başlangıç Tarihi
                                    </label>
                                    <input
                                        type="date"
                                        name="membershipStartDate"
                                        defaultValue={formatDateInput(
                                            state?.membershipStartDate
                                        )}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Üyelik Bitiş Tarihi
                                    </label>
                                    <input
                                        type="date"
                                        name="membershipEndDate"
                                        defaultValue={formatDateInput(
                                            state?.membershipEndDate
                                        )}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="space-y-5">
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
                            </div>

                            <div className="space-y-5">
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
                            </div>

                            <div className="space-y-5">
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Adres
                                    </label>
                                    <input
                                        type="text"
                                        name="adressline"
                                        placeholder="Adres"
                                        defaultValue={state?.adressline}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                        Belediyenin sistem üzerinde aktif olup
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
