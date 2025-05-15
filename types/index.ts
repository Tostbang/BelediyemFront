import { JwtPayload } from "jwt-decode";

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