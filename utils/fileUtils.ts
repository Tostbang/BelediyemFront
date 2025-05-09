export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB in bytes

/**
 * Validates image file size and returns appropriate error message
 * @param file The file to validate
 * @returns Object with validation result and error message if any
 */
export const validateImageSize = (file: File): { valid: boolean; message?: string } => {
    if (!file) {
        return { valid: false, message: 'Dosya seçilmedi.' };
    }

    if (file.size > MAX_FILE_SIZE) {
        const sizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
        return {
            valid: false,
            message: `Dosya boyutu çok büyük. Maksimum dosya boyutu ${sizeMB}MB olmalıdır.`
        };
    }

    return { valid: true };
};

/**
 * Converts a file to base64 string
 * @param file The file to convert
 * @returns Promise that resolves with the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                resolve(reader.result);
            } else {
                reject(new Error('Failed to convert file to base64'));
            }
        };

        reader.onerror = () => {
            reject(reader.error);
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Estimates the size of a base64 string in bytes
 * @param base64String Base64 encoded string
 * @returns Estimated size in bytes
 */
export const estimateBase64Size = (base64String: string): number => {
    // Remove the metadata part (e.g., "data:image/jpeg;base64,")
    const base64Data = base64String.split(',')[1] || base64String;
    // Each base64 character represents 6 bits, so 4 characters represent 3 bytes
    return Math.ceil((base64Data.length * 3) / 4);
};

/**
 * Validates a base64 string size
 * @param base64String Base64 encoded string
 * @returns Object with validation result and error message if any
 */
export const validateBase64Size = (base64String: string): { valid: boolean; message?: string } => {
    if (!base64String) {
        return { valid: false, message: 'Görsel verisi bulunamadı.' };
    }

    const estimatedSize = estimateBase64Size(base64String);

    if (estimatedSize > MAX_FILE_SIZE) {
        const sizeMB = (MAX_FILE_SIZE / (1024 * 1024)).toFixed(0);
        return {
            valid: false,
            message: `Görsel boyutu çok büyük. Maksimum dosya boyutu ${sizeMB}MB olmalıdır.`
        };
    }

    return { valid: true };
};
