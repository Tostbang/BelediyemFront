"use server"
import { cookies } from "next/headers";
import { getClientCookie } from "./auth";
import { ApiFetchOptions } from "@/types";

export const apiFetch = async <T>(
  endpoint: string,
  options: ApiFetchOptions = {}
): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error('API URL bulunamadı!');
  }
  const url = `${baseUrl}${endpoint}`;

  let token: string | null = null;

  if (typeof window === 'undefined') {
    // Server-side
    try {
      const cookieStore = cookies();
      token = (await cookieStore).get('token')?.value || null;
    } catch (error) {
      console.warn('Server-side cookie access failed:', error);
    }
  } else {
    // Client-sidetoken retrieval would go here if needed
    token = getClientCookie('token');
  }

  const headers: HeadersInit = {};

  if (token) {
    (headers as Record<string, string>)['Authorization'] = `${token}`;
  }

  // Add content-type header only if not sending FormData
  if (options.body && !(options.body instanceof FormData)) {
    (headers as Record<string, string>)['Content-Type'] = 'application/json';
  }

  // Merge with custom headers if provided
  const finalHeaders = options.headers ? { ...headers, ...options.headers } : headers;

  try {
    const response = await fetch(url, {
      method: options.method || 'GET',
      headers: finalHeaders,
      body: options.body instanceof FormData
        ? options.body
        : options.body
          ? JSON.stringify(options.body)
          : null,
      cache: options.cache || 'default',
      ...(options.next && { next: options.next }),
    });

    if (!response.ok) {
      throw new Error(`API yanıtı hatalı: ${response.statusText}`);
    }

    const data = await response.json();
    // Check for custom error format
    if (data && data.code !== "200" && data.errors) {
      throw new Error(data.errors[0] || data.message || 'Bir hata oluştu');
    }

    return data as T;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    throw error;
  }
};
