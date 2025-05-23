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

export type RoleType = 'admin' | 'municipality' | 'staff' | 'admin-muni';

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
    logoImage?: string;
    municipalityName?: number;

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


export type TopMunicipalities = {
    municipalityName: string;
    complaintCount: number;
};

export type TopComplaintCategories = {
    categoryName: string;
    complaintCount: number;
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

export type DashboardStatisticsStaff = ApiResponse & {
    totalComplaints: number;
    resolvedCount: number;
    pendingCount: number;
    underReviewCount: number;
    startedCount: number;
    rejectedCount: number;
    monthlyStatistics: MonthlyStatistics[];
};

export type DashboardStatisticsAdmin = ApiResponse & {
    totalComplaints: number;
    resolvedCount: number;
    pendingCount: number;
    underReviewCount: number;
    startedCount: number;
    rejectedCount: number;
    totalMunicipalities: number;
    totalCitizens: number;
    totalStaff: number;
    totalAdmins: number;
    monthlyStatistics: MonthlyStatistics[];
    departmentStatistics: DepartmentStatistics[];
    topMunicipalities: TopMunicipalities[];
    topComplaintCategories: TopComplaintCategories[];
};

export type Municipalities = {
    id: number;
    name: string;
    email: string;
    phone: string;
    municipalityStatusType: number;
    logoImg: string;
    url: string;
    membershipType: number;
    membershipStartDate: string;
    membershipEndDate: string;
    city: string;
    discrit: string;
    adressline: string;
    profileImage: string;
    status: number;
    createdDate: string;
    modifiedDate: string;
}

export type InfoMuni = ApiResponse & {
    municipalities: Municipalities
}

export type Devices = {
    id: number;
    userId: number;
    deviceInfo: string;
    ipAddress: string;
    loginTime: string;
}

export type DevicesResponse = ApiResponse & {
    devices: Devices[];
}

export type StaffUser = {
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: number;
    profileImage: string;
    municipalityName: string;
    municipalityId: number;
}

export type InfoStaff = ApiResponse & {
    municipalStaff: StaffUser
}

export type AdminUser = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: number;
    profileImage: string;
}

export type InfoAdmin = ApiResponse & {
    user: StaffUser
}

export type FAQ = {
    id: number;
    title: string;
    description: string;
    municipalityId: number;
    userType: number;
    createdDate: string;
    modifiedDate: string;
}
export type FAQResponse = ApiResponse & {
    frequentlyAskedQuestions: FAQ[];
}

export type FAQDetail = ApiResponse & {
    frequentlyAsked: FAQ;
}

export type MuniListResponse = ApiResponse & {
    municipalities: Municipalities[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
}

export type MuniDetailResponse = ApiResponse & {
    municipality: Municipalities;
}

export type PasswordReset = {
    id: number;
    userId: number;
    name: string;
    email: string;
    createdDate: string;
    passwordResetStatus: number;
}