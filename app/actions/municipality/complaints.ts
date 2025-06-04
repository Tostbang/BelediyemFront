"use server";

import { ApiResponse, ComplaintsDetailResponse, ComplaintsPaginationBody, ComplaintsResponse, ComplaintsStatusPBody, ComplaintStatusesResponse } from "@/types";
import { apiFetch } from "@/utils/api";
import { validateBase64Size } from "@/utils/fileUtils";
import { uploadImage } from "../file";

export const getComplaintsMuni = async (body: ComplaintsPaginationBody) => {
    try {
        const data = await apiFetch('municipality/getcomplaints', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize,
                categoryType: body.categoryType || null,
                complaintsStatusType: body.complaintsStatusType || null,
                startDate: body.startDate || undefined,
                endDate: body.endDate || undefined,
            }
        });

        return data as ComplaintsResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getComplaintByIdMuni = async (id: string) => {
    try {
        const data = await apiFetch(`municipality/getcomplaintdetail?complaintId=${id}`);

        return data as ComplaintsDetailResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getComplaintStatusesMuni = async (body: ComplaintsStatusPBody) => {
    try {

        const data = await apiFetch('municipality/getcomplaintsstatus', {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize,
                complaintId: body.complaintId || undefined,
            }
        });


        return data as ComplaintStatusesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const updateComplaintStatusMuni = async (formData: FormData) => {
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

        const response = await apiFetch<ApiResponse>('municipality/updatecomplaintstatus', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Şikayet durumu başarıyla güncellendi.',
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

export const updateCompletedComplaintStatusMuni = async (formData: FormData) => {
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


        const response = await apiFetch<ApiResponse>('municipality/municipalitycreatecomplatedcomplaints', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Şikayet durumu başarıyla güncellendi.',
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

export const attendtComplaintToStaffMuni = async (complaintId: string, staffId: string) => {
    try {

        if (!complaintId || !staffId) {
            return { success: false, message: "", errors: 'Lütfen tüm alanları doldurun.' };
        }

        const payload = {
            complaintId,
            staffId,
        };

        const response = await apiFetch<ApiResponse>('municipality/assigncomplaint', {
            method: 'POST',
            body: payload
        });

        return {
            success: true,
            message: response.message || 'Şikayet personele başarıyla atandı.',
            errors: [],
            ...payload,
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Şikayet personele atanamadı.',
        };
    }
}
