"use server";
import { DashboardStatisticsMuni, DevicesResponse, PaginationBody, ReportsMuniResponse } from "@/types";
import axiosInstance from "@/utils/axios";
import { getCookie } from "../cookies";


export const getDashboardMuniAdmin = async () => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getdashboardstatistics?municipalityId=${municipalityId}`);
        return response.data as DashboardStatisticsMuni;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getReportsMuniAdmin = async (body: PaginationBody) => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.post(`adminmunicipalitypanel/getallreports?municipalityId=${municipalityId}`, {
            pageNumber: body.pageNumber - 1,
            pageSize: body.pageSize
        });

        return response.data as ReportsMuniResponse;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createReportMuniAdmin = async () => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/createstatisticsreport?municipalityId=${municipalityId}`);
        return { success: true, message: response.data.message || 'Rapor oluşturuldu.', errors: [] };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Rapor oluşturulamadı.',
        };
    }
}

export const getDevicesMuniAdmin = async () => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const response = await axiosInstance.get(`adminmunicipalitypanel/getalldevice?municipalityId=${municipalityId}`);
        return response.data as DevicesResponse;
    } catch (error) {
        console.error(error);
        return null;
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
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Oturum kapatılamadı.',
        };
    }
}