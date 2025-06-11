"use server";

import { CitizenUserResponse, PaginationBody, PasswordResetResponse, StaffAttendedComplaintsPaginationBody, ComplaintsResponse, StaffPaginationBody, StaffUserDetailResponse, StaffUserListResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";
import { getCookie } from "../cookies";

export const getStaffsMuniAdmin = async (body: StaffPaginationBody): Promise<ApiResponseT<StaffUserListResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/municipalitystafflist`, {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            municipalStaffType: body.municipalStaffType || undefined,
            searchText: body.searchText || '',
            municipalityId,
        });

        return {
            success: true,
            data: response.data as StaffUserListResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getStaffByIdMuniAdmin = async (id: string): Promise<ApiResponseT<StaffUserDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/municipalitystaffdetail?staffid=${id}`);

        return {
            success: true,
            data: response.data as StaffUserDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const addStaffMuniAdmin = async (formData: FormData) => {
    const municipalityId = await getCookie('municipalityId');
    try {
        const name = formData.get('name') as string;
        const surname = formData.get('surname') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const role = formData.get('role') as string;
        const password = formData.get('password') as string;

        if (!name || !email || !surname || !phone || !role) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            name,
            surname,
            email,
            phone,
            password,
            role: parseInt(role),
        };

        const response = await axiosInstance.post(`adminmunicipalitypanel/registermunicipalitystaff?municipalityId=${municipalityId}`, payload);

        return {
            success: true,
            message: response.data.message || 'Personel başarıyla eklendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateStaffMuniAdmin = async (formData: FormData) => {
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

        const response = await axiosInstance.put('adminmunicipalitypanel/putinfostaff', payload);

        return {
            success: true,
            message: response.data.message || 'Personel bilgileri başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getStaffPWResetRequestMuniAdmin = async (body: PaginationBody): Promise<ApiResponseT<PasswordResetResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post('adminmunicipalitypanel/municipalitystaffresetrequestlist', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            municipalityId,
        });

        return {
            success: true,
            data: response.data as PasswordResetResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const sendStaffPWMuniAdmin = async (id: string) => {
    try {
        const response = await axiosInstance.post('adminmunicipalitypanel/municipalitysendnewpassword', {
            staffId: id
        });

        return {
            success: true,
            message: response.data.message || 'Yeni şifre başarıyla gönderilidi.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getCitizenMuniAdmin = async (body: PaginationBody): Promise<ApiResponseT<CitizenUserResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/citizenlist?municipalityId=${municipalityId}`, {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            searchText: body.searchText || '',
        });

        return {
            success: true,
            data: response.data as CitizenUserResponse
        }

    } catch (error) {
        return handleApiError(error);
    }
}

export const getStaffComplaintsMuniAdmin = async (body: StaffAttendedComplaintsPaginationBody): Promise<ApiResponseT<ComplaintsResponse>> => {
    try {
        const response = await axiosInstance.post('adminmunicipalitypanel/getstaffcomplaints', {
            municipalityStaffId: body.municipalityStaffId || undefined,
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            categoryType: body.categoryType || undefined,
            complaintsStatusType: body.complaintsStatusType || undefined,
            startDate: body.startDate || undefined,
            endDate: body.endDate || undefined,
        });

        return {
            success: true,
            data: response.data as ComplaintsResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const updateStaffStatusMuniAdmin = async (id: string, status: boolean) => {
    try {
        const response = await axiosInstance.put('adminmunicipalitypanel/staffupdatestatus', {
            staffId: id,
            status
        });

        return {
            success: true,
            message: response.data.message || 'Personel durumu başarıyla güncellendi.',
            errors: [],
        };
    }
    catch (error) {
        return handleApiError(error);
    }
}


