"use server"

import { ApiResponse, ApiResponseT, MuniDetailResponse, MuniListResponse, PaginationBody, PasswordResetResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import { handleApiError } from "@/utils/errorHandler";

export const getMunisAdmin = async (body: PaginationBody): Promise<ApiResponseT<MuniListResponse>> => {
    try {
        const response = await axiosInstance.post('admin/municipalitylist', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return {
            success: true,
            data: response.data as MuniListResponse
        }
    } catch (error) {
        return handleApiError(error);

    }
}

export const getMuniByIdAdmin = async (id: string): Promise<ApiResponseT<MuniDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`admin/adminmunicipalitydetail?municipalId=${id}`);
        return {
            success: true,
            data: response.data as MuniDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const addMuniAdmin = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const phone = formData.get('phone') as string;
        const landlinePhone = formData.get('landlinePhone') as string;
        const membershipType = formData.get('membershipType') as string;

        if (!name || !email || !password || !phone || !membershipType || !landlinePhone) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            name,
            email,
            password,
            phone,
            landlinePhone,
            membershipType: parseInt(membershipType),
        };

        const response = await axiosInstance.post('admin/registermunicipality', payload);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Belediye başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);

    }
}

export const updateMuniAdmin = async (formData: FormData) => {
    try {

        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const landlinePhone = formData.get('landlinePhone') as string;
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

        if (!imageData || !id || !name || !email || !phone || !landlinePhone || !membershipType || !membershipStartDate || !membershipEndDate || !city || !discrit || !adressline || !url) {
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
            landlinePhone,
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

        const response = await axiosInstance.put('admin/putinfomunicipality', payload);
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Belediye bilgileri başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);

    }
}

export const updateMuniStatusAdmin = async (id: string, status: boolean) => {
    try {
        const response = await axiosInstance.put('admin/municipalityupdatestatus', {
            municipalityId: id,
            status
        });
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Belediye durumu başarıyla güncellendi.',
            errors: [],
        };
    }
    catch (error) {
        return handleApiError(error);

    }
}

export const getMunisPWResetRequestAdmin = async (body: PaginationBody): Promise<ApiResponseT<PasswordResetResponse>> => {
    try {
        const response = await axiosInstance.post('admin/getmunicipalitypasswordresetlist', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });
        return {
            success: true,
            data: response.data as PasswordResetResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const sendMunisPWAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.post('admin/adminsendnewpassword', {
            staffId: id
        });
        const data = response.data as ApiResponse;

        return {
            success: true,
            message: data.message || 'Yeni şifre başarıyla gönderilidi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);

    }
}