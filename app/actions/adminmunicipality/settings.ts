"use server";
import { ApiResponseT, DashboardStatisticsMuni, DevicesResponse, PaginationBody, ReportsMuniResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { getCookie } from "../cookies";
import { handleApiError } from "@/utils/errorHandler";


export const getDashboardMuniAdmin = async (): Promise<ApiResponseT<DashboardStatisticsMuni>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getdashboardstatistics?municipalityId=${municipalityId}`);
        return {
            success: true,
            data: response.data as DashboardStatisticsMuni
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const getReportsMuniAdmin = async (body: PaginationBody): Promise<ApiResponseT<ReportsMuniResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/getallreports?municipalityId=${municipalityId}`, {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return {
            success: true,
            data: response.data as ReportsMuniResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const createReportMuniAdmin = async () => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/createstatisticsreport?municipalityId=${municipalityId}`);
        return { success: true, message: response.data.message || 'Rapor oluşturuldu.', errors: [] };
    } catch (error) {
        return handleApiError(error);
    }
}

export const getDevicesMuniAdmin = async (): Promise<ApiResponseT<DevicesResponse>> => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getalldevice?municipalityId=${municipalityId}`);
        return {
            success: true,
            data: response.data as DevicesResponse
        }
    } catch (error) {
        return handleApiError(error);
    }
}

export const closeDeviceMuniAdmin = async (id: string) => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/closedevice?deviceId=${id}&municipalityId=${municipalityId}`);
        return {
            success: true,
            message: response.data.message || 'Oturum başarıyla kapatıldı.',
            errors: [],
        };
    } catch (error) {
        return handleApiError(error);
    }
}