'use server';

import { cookies } from 'next/headers';

interface CookieOptions {
    maxAge?: number;
    path?: string;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
}

export async function setCookie(
    name: string,
    value: string,
    options: CookieOptions = {}
) {
    const defaultOptions: CookieOptions = {
        maxAge: 60 * 60 * 24, // 1 day default
        path: '/',
    };

    const cookieOptions = { ...defaultOptions, ...options };
    (await cookies()).set(name, value, cookieOptions);
    return { success: true };
}

export async function getCookie(name: string) {
    return (await cookies()).get(name)?.value;
}

export async function deleteCookie(name: string) {
    (await cookies()).delete(name);
    return { success: true };
}

export async function clearCookies() {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();
    for (const cookie of allCookies) {
        cookieStore.delete(cookie.name);
    }
    return { success: true };
}