"use server";

import { ApiResponse, PaginationBody, PasswordResetResponse, StaffPaginationBody, StaffUserDetailResponse, StaffUserListResponse } from "@/types";
import { apiFetch } from "@/utils/api";

export const getStaffsMuni = async (body: StaffPaginationBody) => {
    try {
        const data = await apiFetch('municipality/municipalitystafflist', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize,
                searchText: body.searchText || '',
                municipalStaffType: body.municipalStaffType || undefined
            }
        });

        return data as StaffUserListResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getStaffByIdMuni = async (id: string) => {
    try {
        const data = await apiFetch(`municipality/municipalitystafdetail?staffId=${id}`);

        return data as StaffUserDetailResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const addStaffMuni = async (formData: FormData) => {
    try {
        const name = formData.get('name') as string;
        const surname = formData.get('surname') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const role = formData.get('role') as string;
        const password = formData.get('password') as string;

        if (!name || !email || !surname || !phone || !role || !password) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            name,
            surname,
            email,
            phone,
            role: parseInt(role),
        };

        const response = await apiFetch<ApiResponse>('municipality/registermunicipalitystaff', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Personel başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Personel eklenemedi.',
        };
    }
}

export const updateStaffMuni = async (formData: FormData) => {
    try {

        const id = formData.get('id') as string;
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const surname = formData.get('surname') as string;
        const role = formData.get('role') as string;
        const statusRaw = formData.get('status') as string | null;
        const status = statusRaw === 'on' ? true : false;

        if (!id || !name || !email || !surname || !phone || !role) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            staffId: id,
            name,
            surname,
            email,
            phone,
            status,
            role: parseInt(role)
        };

        const response = await apiFetch<ApiResponse>('municipality/putinfostaff', {
            method: 'PUT',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Personel bilgileri başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Personel bilgileri güncellenemedi.',
        };
    }
}

export const getStaffPWResetRequestMuni = async (body: PaginationBody) => {
    try {
        const data = await apiFetch('municipality/municipalitystaffresetrequestlist', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize
            }
        });

        return data as PasswordResetResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const sendStaffPWMuni = async (id: string) => {
    try {
        const data = await apiFetch<ApiResponse>('municipality/municipalitysendnewpassword', {
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