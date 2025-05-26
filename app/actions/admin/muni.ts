"use server"

import { ApiResponse, MuniDetailResponse, MuniListResponse, PaginationBody } from "@/types";
import { apiFetch } from "@/utils/api";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";

export const getMunisAdmin = async (body: PaginationBody) => {
    try {
        const data = await apiFetch('admin/municipalitylist', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize
            }
        });

        return data as MuniListResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getMuniByIdAdmin = async (id: string) => {
    try {
        const data = await apiFetch(`admin/adminmunicipalitydetail?municipalId=${id}`);

        return data as MuniDetailResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addMuniAdmin = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const phone = formData.get('phone') as string;
        const membershipType = formData.get('membershipType') as string;

        if (!name || !email || !password || !phone || !membershipType) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            name,
            email,
            password,
            phone,
            membershipType: parseInt(membershipType),

        };

        const response = await apiFetch<ApiResponse>('admin/registermunicipality', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Belediye başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Belediye eklenemedi.',
        };
    }
}

export const updateMuniAdmin = async (formData: FormData) => {
    try {

        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const membershipType = formData.get('membershipType') as string;
        const membershipStartDate = formData.get('membershipStartDate') as string;
        const membershipEndDate = formData.get('membershipEndDate') as string;
        const city = formData.get('city') as string;
        const discrit = formData.get('discrit') as string;
        const adressline = formData.get('adressline') as string;
        const statusRaw = formData.get('status') as string | null;
        const imageData = formData.get('logoImg') as string;
        const url = formData.get('url') as string;

        // status boolean olarak ayarlanıyor
        const status = statusRaw === 'on' ? true : false;

        if (!imageData || !id || !name || !email || !phone || !membershipType || !membershipStartDate || !membershipEndDate || !city || !discrit || !adressline || !url) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        let imagePath = imageData;
        if (imageData.startsWith('data:image')) {
            const sizeValidation = validateBase64Size(imageData);
            if (!sizeValidation.valid) {
                return { success: false, message: "", errors: sizeValidation.message };
            }

            const imageFormData = new FormData();
            imageFormData.append('image', imageData);

            const uploadResult = await uploadImage(imageFormData);
            if (!uploadResult.success) {
                return {
                    success: false,
                    message: "",
                    errors: uploadResult.errors || 'Görsel yüklenemedi.'
                };
            }
            imagePath = uploadResult.path ?? '';
        }


        const payload = {
            municipalityId: id,
            name,
            email,
            phone,
            membershipType: parseInt(membershipType),
            membershipStartDate,
            membershipEndDate,
            municipalityStatusType: 1,
            city,
            discrit,
            adressline,
            status, // boolean olarak gönderiliyor
            logoImg: imagePath,
            url
        };


        const response = await apiFetch<ApiResponse>('admin/putinfomunicipality', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Belediye bilgileri başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Belediye bilgileri güncellenemedi.',
        };
    }
}

export const getMunisPWResetRequestAdmin = async (body: PaginationBody) => {
    try {
        const data = await apiFetch('admin/getmunicipalitypasswordresetlist', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize
            }
        });

        return data as MuniListResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getMunisSendPWAdmin = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>('admin/adminsendnewpassword', {
            method: 'POST',
            body: {
                staffId: id
            }
        });

        return {
            success: true,
            message: data.message || 'Yeni şifre başarıyla gönderilidi.',
            errors: [],
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Yeni şifre gönderilemedi.',
        };
    }
}