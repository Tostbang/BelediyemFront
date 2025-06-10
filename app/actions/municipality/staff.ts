"use server";

import { CitizenUserDetailResponse, CitizenUserResponse, PaginationBody, PasswordResetResponse, StaffAttendedComplaintsPaginationBody, ComplaintsResponse, StaffPaginationBody, StaffUserDetailResponse, StaffUserListResponse, ApiResponseT } from "@/types";
import axiosInstance from "@/utils/axios";
import { handleApiError } from "@/utils/errorHandler";

export const getStaffsMuni = async (body: StaffPaginationBody): Promise<ApiResponseT<StaffUserListResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/municipalitystafflist', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            municipalStaffType: body.municipalStaffType || undefined,
            searchText: body.searchText || '',
        });

        return {
            success: true,
            data: response.data as StaffUserListResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getStaffsAllMuni = async (id: string): Promise<ApiResponseT<StaffUserListResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/listdepartmenttostaff?municipalStaffId=${id}`);

        return {
            success: true,
            data: response.data as StaffUserListResponse
        }

    } catch (error) {
        return handleApiError(error);
    }
}

export const getStaffByIdMuni = async (id: string): Promise<ApiResponseT<StaffUserDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/municipalitystaffdetail?staffid=${id}`);

        return {
            success: true,
            data: response.data as StaffUserDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
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

        const response = await axiosInstance.post('municipality/registermunicipalitystaff', payload);

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

        const response = await axiosInstance.put('municipality/putinfostaff', payload);

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

export const updateStaffStatusMuni = async (id: string, status: boolean) => {
    try {
        const response = await axiosInstance.put('municipality/staffupdatestatus', {
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

export const getStaffPWResetRequestMuni = async (body: PaginationBody): Promise<ApiResponseT<PasswordResetResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/municipalitystaffresetrequestlist', {
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

export const sendStaffPWMuni = async (id: string) => {
    try {
        const response = await axiosInstance.post('municipality/municipalitysendnewpassword', {
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

export const getStaffComplaintsMuni = async (body: StaffAttendedComplaintsPaginationBody): Promise<ApiResponseT<ComplaintsResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/getstaffcomplaints', {
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

export const getCitizenMuni = async (body: PaginationBody): Promise<ApiResponseT<CitizenUserResponse>> => {
    try {
        const response = await axiosInstance.post('municipality/citizenlist', {
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

export const getCitizenByIdMuni = async (id: string): Promise<ApiResponseT<CitizenUserDetailResponse>> => {
    try {
        const response = await axiosInstance.get(`municipality/citizendetail?citizenid=${id}`);

        return {
            success: true,
            data: response.data as CitizenUserDetailResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}
