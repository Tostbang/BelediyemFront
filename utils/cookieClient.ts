'use client';

import { getCookie, setCookie, deleteCookie } from '../app/actions/cookies';

// Client-side wrapper for server actions
export const getCookieValue = getCookie;
export const setCookieValue = setCookie;
export const removeCookieValue = deleteCookie;
