"use server";

import { CitizenUserDetailResponse, CitizenUserResponse, PaginationBody, PasswordResetResponse, StaffAttendedComplaintsPaginationBody, ComplaintsResponse, StaffPaginationBody, StaffUserDetailResponse, StaffUserListResponse } from "@/types";
import axiosInstance from "@/utils/axios";

export const getStaffsMuni = async (body: StaffPaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/municipalitystafflist', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            municipalStaffType: body.municipalStaffType || undefined,
            searchText: body.searchText || '',
        });

        return response.data as StaffUserListResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getStaffsAllMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/listdepartmenttostaff?municipalStaffId=${id}`);

        return response.data as StaffUserListResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getStaffByIdMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/municipalitystaffdetail?staffid=${id}`);

        return response.data as StaffUserDetailResponse
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

        const response = await axiosInstance.put('municipality/putinfostaff', payload);

        return {
            success: true,
            message: response.data.message || 'Personel bilgileri başarıyla güncellendi.',
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Personel durumu güncellenemedi.',
        };
    }
}

export const getStaffPWResetRequestMuni = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/municipalitystaffresetrequestlist', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return response.data as PasswordResetResponse
    } catch (error) {
        console.error(error);
        return null;
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Yeni şifre gönderilemedi.',
        };
    }
}

export const getStaffComplaintsMuni = async (body: StaffAttendedComplaintsPaginationBody) => {
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

        return response.data as ComplaintsResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getCitizenMuni = async (body: PaginationBody) => {
    try {
        const response = await axiosInstance.post('municipality/citizenlist', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            searchText: body.searchText || '',
        });

        return response.data as CitizenUserResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getCitizenByIdMuni = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipality/citizendetail?citizenid=${id}`);

        return response.data as CitizenUserDetailResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}
