"use server";
import { DashboardStatisticsMuni, PaginationBody, ReportsMuniResponse } from "@/types";
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