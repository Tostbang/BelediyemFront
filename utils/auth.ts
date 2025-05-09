
export const getClientCookie = (name: string): string | null => {
  if (typeof document !== 'undefined') {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null;
    }
  }
  return null;
};

export const deleteClientCookie = (name: string): void => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
}

export const safelyParseJSON = <T = unknown,>(
  jsonString: string | null
): T | null => {
  if (!jsonString) return null;
  try {
    const decodedString = decodeURIComponent(jsonString);
    return JSON.parse(decodedString) as T;
  } catch (error) {
    console.log('Error parsing JSON:', error);
    return null;
  }
};

export const logout = (): void => {
  deleteClientCookie("token");
  deleteClientCookie("user");
};
