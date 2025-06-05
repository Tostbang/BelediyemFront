"use server";

import { ComplaintsDetailResponse, ComplaintsPaginationBody, ComplaintsResponse } from "@/types";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";
import axiosInstance from "@/utils/axios";

export const getComplaintsStaff = async (body: ComplaintsPaginationBody) => {
    try {
        const response = await axiosInstance.post('municipalstaff/getstaffcomplaints', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            categoryType: body.categoryType || null,
            complaintsStatusType: body.complaintsStatusType || null,
            startDate: body.startDate || undefined,
            endDate: body.endDate || undefined,
        }
        );

        return response.data as ComplaintsResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getComplaintsDepartmentStaff = async (body: ComplaintsPaginationBody) => {
    try {
        const response = await axiosInstance.post('municipalstaff/getdepartmentcomplaints', {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize,
            categoryType: body.categoryType || null,
            complaintsStatusType: body.complaintsStatusType || null,
            startDate: body.startDate || undefined,
            endDate: body.endDate || undefined,
        });

        return response.data as ComplaintsResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getComplaintByIdStaff = async (id: string) => {
    try {
        const response = await axiosInstance.get(`municipalstaff/getcomplaintdetail?complaintId=${id}`);

        return response.data as ComplaintsDetailResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateComplaintStatusStaff = async (formData: FormData) => {
    try {

        const id = formData.get('id') as string;
        const complaintsStatusType = formData.get('complaintsStatusType') as string;

        if (!id || !complaintsStatusType) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            complaintId: id,
            complaintsStatusType: parseInt(complaintsStatusType)
        };

        const response = await axiosInstance.post('municipalstaff/updatecomplaintstatus',
            payload
        );

        return {
            success: true,
            message: response.data.message || 'Şikayet durumu başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Şikayet durumu güncellenemedi.',
        };
    }
}

export const updateCompletedComplaintStatusStaff = async (formData: FormData) => {
    try {
        const id = formData.get('id') as string;
        const description = formData.get('description') as string;
        const imageData = formData.get('image') as string;
        const complaintStatus = formData.get('complaintStatus') as string;

        if (!id || !imageData || !description || !complaintStatus) {
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
            complaintId: id,
            description,
            complaintStatus: complaintStatus === 'true' ? true : false,
            image: imagePath
        };


        const response = await axiosInstance.post('municipalstaff/createcomplatedcomplaints', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.data.message || 'Şikayet durumu başarıyla güncellendi.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Şikayet durumu güncellenemedi.',
        };
    }
}
