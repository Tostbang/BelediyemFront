"use server";
import { ApiResponse, DashboardStatisticsMuni, DevicesResponse, PaginationBody, ReportsMuniResponse } from "@/types";
import { apiFetch } from "@/utils/api";
import { getCookie } from "../cookies";


export const getDashboardMuniAdmin = async () => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const data = await apiFetch(`adminmunicipalitypanel/getdashboardstatistics?municipalityId=${municipalityId}`);

        return data as DashboardStatisticsMuni
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getReportsMuniAdmin = async (body: PaginationBody) => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const data = await apiFetch(`adminmunicipalitypanel/getallreports?municipalityId=${municipalityId}`, {
            method: 'POST',
            body: {
                pageNumber: body.pageNumber - 1,
                pageSize: body.pageSize
            }
        });

        return data as ReportsMuniResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const createReportMuniAdmin = async () => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const data = await apiFetch<ApiResponse>(`adminmunicipalitypanel/createstatisticsreport?municipalityId=${municipalityId}`);

        return { success: true, message: data.message || 'Rapor oluşturuldu.', errors: [] };
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
        const data = await apiFetch(`adminmunicipalitypanel/getalldevice?municipalityId=${municipalityId}`);

        return data as DevicesResponse
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const closeDeviceMuniAdmin = async (id: string) => {
    const municipalityId = await getCookie('municipalityId');

    try {
        const data = await apiFetch<ApiResponse>(`adminmunicipalitypanel/closedevice?deviceId=${id}&municipalityId=${municipalityId}`);

        return {
            success: true,
            message: data.message || 'Oturum başarıyla kapatıldı.',
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