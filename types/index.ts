import { JwtPayload } from "jwt-decode";

export type SidebarItem = {
    path?: string;
    icon: React.ReactNode;
    title: string;
    isLogout?: boolean;
    children?: SidebarItem[];
};

export type PaginationBody = {
    pageNumber: number;
    pageSize: number;
};


export type ApiFetchOptions = {
    method?: string;
    body?: unknown;
    headers?: HeadersInit;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
}

export interface CustomJwtPayload extends JwtPayload {
    exp: number;
}

export type User = {
    userId?: number;
    token: string;
    email: string;
    name: string;
    surname: string;
    role?: number;
    profileImage?: string;
};

export type ApiResponse = {
    code: string;
    success?: boolean;
    message: string;
    errors: string | string[];
}

export type LoginResponse = ApiResponse & User & {
    token: string;
}



export type MonthlyStatistics = {
    month: string;
    totalComplaints: number;
    resolvedCount: number;
    pendingCount: number;
    underReviewCount: number;
    startedCount: number;
    rejectedCount: number;
};

export type DepartmentStatistics = {
    departmentName: string;
    totalComplaints: number;
    resolvedCount: number;
    pendingCount: number;
    underReviewCount: number;
    startedCount: number;
    rejectedCount: number;
};


export type DashboardStatisticsMuni = ApiResponse & {
    totalComplaints: number;
    resolvedCount: number;
    pendingCount: number;
    underReviewCount: number;
    startedCount: number;
    rejectedCount: number;
    monthlyStatistics: MonthlyStatistics[];
    departmentStatistics: DepartmentStatistics[];
};

export type ComplaintReports = {
    id: number;
    municipalityId: number;
    fileName: string;
    fileContent: string;
    createdDate: string;
}

export type ReportsMuni = {
    complaintReports: ComplaintReports[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
}

export type ReportsMuniResponse = ApiResponse & ReportsMuni;