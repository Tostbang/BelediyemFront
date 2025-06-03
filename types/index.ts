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
    searchText?: string;
};

export type RoleType = 'admin' | 'municipality' | 'staff' | 'admin-muni';

export type ApiFetchOptions = {
    method?: string;
    body?: unknown;
    headers?: HeadersInit;
    cache?: RequestCache;
    next?: NextFetchRequestConfig;
}

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

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
    landlinePhone: string;
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
    status: boolean;
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
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    role: number;
    profileImage: string;
    municipalityName: string;
    municipalityId: number;
    status: boolean;
    createdDate: string;
    modifiedDate: string;
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
    municipalLists: Municipalities[];
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

export type PasswordResetResponse = ApiResponse & {
    requests: PasswordReset[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
}


export type Ratings = {
    id: number;
    complaintId: number;
    complaintTitle: string;
    complaintDescription: string;
    complaintStatusType: number;
    userId: number;
    userName: string;
    userProfileImage: string;
    rating: number;
    comment: string;
    createdDate: string;
    modifiedDate: string;
    status: boolean;

}

export type RatingResponse = ApiResponse & {
    ratings: Ratings[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
}

export type RatingDetail = ApiResponse & {
    ratingDto: Ratings;
}

export type Contract = {
    id: number;
    name: number;
    content: string;
    contractType: number;

}

export type ContractsResponse = ApiResponse & {
    contract: Contract[];
}

export type ContractDetailResponse = ApiResponse & {
    contract: Contract;
}


export type StaffUserListResponse = ApiResponse & {
    municipalStaff: StaffUser[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
}

export type StaffUserDetailResponse = ApiResponse & {
    municipalityStaff: StaffUser;
}

export type StaffPaginationBody = PaginationBody & {
    municipalStaffType?: number;
};

export type StaffAttendedComplaintsPaginationBody = PaginationBody & {
    municipalityStaffId?: number;
    categoryType?: number;
    complaintsStatusType?: number;
    startDate?: string;
    endDate?: string;
};

export type Complaints = {
    id: number;
    title: string;
    description: string;
    firstImage: string;
    secondImage: string;
    thirdImage: string;
    userName: string;
    userSurname: string;
    createdDate: string;
    modifiedDate: string;
    categoryType: number;
    latitude: string;
    longitude: string;
    userId: number;
    complaintsStatusType: number;
    complaintsStatus: {
        id: number;
        createdById: number;
        createdByRole: number;
        createdDate: string;
        complaintId: number;
        complaintsStatusType: number;
    }[];
    user: CitezenUser;
    assignedStaff: StaffUser
}


export type ComplaintsResponse = ApiResponse & {
    complaints: Complaints[];
    name: string;
    surname: string;
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type ComplaintsDetailResponse = ApiResponse & {
    complaint: Complaints;
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
}

export type CitezenUser = {
    userId: number;
    municipalityId: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    identityNumber: string;
    birthDay: string;
    createdDate: string;
    role: number;
    profileImage: string;
};

export type CitizenUserResponse = ApiResponse & {
    users: CitezenUser[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type CitizenUserDetailResponse = ApiResponse & {
    user: CitezenUser;
};

export type Announcement = {
    id: number;
    title: string;
    description: string;
    municipalityId: number;
    announcementsType: string;
    image: string;
};

export type AnnouncementResponse = ApiResponse & {
    announcements: Announcement[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type AnnouncementDetailResponse = ApiResponse & {
    announcementDetail: Announcement;
};

export type AnnouncementPaginationBody = PaginationBody & {
    announcementsType?: number;
    startDate?: string;
    endDate?: string;
};


export type Slider = {
    id: number;
    image: string;
    url: string;
    createdBy: number;
    createdByRole: number;
    muncipalityId: number;
    status: boolean;
}

export type SliderResponse = ApiResponse & {
    sliders: Slider[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type SliderDetailResponse = ApiResponse & {
    slider: Slider;
};

export type Venue = {
    id: number;
    title: string;
    description: string;
    image: string;
    municipalityId: number;
    latitude: string;
    longitude: string;
    status: boolean;
    createdDate: string;
    modifiedDate: string;
}

export type VenueResponse = ApiResponse & {
    venues: Venue[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type VenueDetailResponse = ApiResponse & {
    venue: Venue;
};

export type Facility = {
    id: number;
    title: string;
    description: string;
    image: string;
    municipalityId: number;
    latitude: string;
    longitude: string;
    address: string;
    status: boolean;
    createdDate: string;
    modifiedDate: string;
}

export type FacilityResponse = ApiResponse & {
    facilities: Facility[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type FacilityDetailResponse = ApiResponse & {
    facility: Facility;
};

export type Assembly = {
    id: number;
    title: string;
    longitude: string;
    latitude: string;
    status: boolean;
    createdDate: string;
    modifiedDate: string;
    municipalityId: number;
}

export type AssemblyResponse = ApiResponse & {
    assemblyAreas: Assembly[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type AssemblyDetailResponse = ApiResponse & {
    assemblyArea: Assembly;
};

export type Support = {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    title: string;
    message: string;
    supportStatusType: number;
    answeredText: string;
    municipalityId: number;
    createdDate: string;
    modifiedDate: string;
}

export type SupportResponse = ApiResponse & {
    supports: Support[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type SupportDetailResponse = ApiResponse & {
    support: Support;
};


export type ComplaintsPaginationBody = PaginationBody & {
    complaintsStatusType?: number;
    categoryType?: number;
    startDate?: string;
    endDate?: string;
};

export type ComplaintsStatusPBody = PaginationBody & {
    complaintId?: number;
};

export type ComplaintStatuses = {
    id: number;
    name: string;
    surname: string;
    role: number;
    profileImage: string;
    createdDate: string;
    complaintsStatusType: number;
}

export type ComplaintStatusesResponse = ApiResponse & {
    complaintsStatuses: ComplaintStatuses[];
    totalCount: number;
    pageNumber: number;
    pageSize: number;
    lastPage: boolean;
    backPage: boolean;
    nextPage: boolean;
};

export type Message = {
    id: number;
    senderId: number;
    senderName: string;
    senderProfileImage: string;
    senderType: string;
    receiverId: number;
    receiverName: string;
    receiverProfileImage: string;
    receiverType: string;
    content: string;
    createdDate: string;
    isRead: boolean;
    isFromCurrentUser: boolean;
    isToCurrentUser: boolean;
}

export type MessagesResponse = ApiResponse & {
    messageGroups: {
        date: string;
        messages: Message[];
    }[];
};