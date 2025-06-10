"use server";

export type ErrorResponse = {
    success: false;
    message: string;
    errors: string;
    status?: string;
};

/**
 * Processes API errors and returns standardized error responses
 */
export async function handleApiError(error: unknown): Promise<ErrorResponse> {
    // Check for type-based errors
    if (error && typeof error === 'object' && 'type' in error) {
        const errorType = (error as { type: string }).type;

        // Handle different error types
        switch (errorType) {
            case 'NOT_FOUND':
                return {
                    success: false,
                    message: '',
                    errors: 'Endpoint bulunamadı: Lütfen API endpoint adresini kontrol ediniz.',
                };

            case 'PAYLOAD_TOO_LARGE':
                return {
                    success: false,
                    message: '',
                    errors: 'Dosya boyutu çok büyük (maksimum 10MB)',
                };

            case 'SERVER_ERROR':
                return {
                    success: false,
                    message: '',
                    errors: 'Sunucu Hatası',
                };

            case 'UNAUTHORIZED':
                return {
                    success: false,
                    message: '',
                    errors: "Yetkisiz Erişim: Token geçersiz veya süresi dolmuş.",
                    status: 'UNAUTHORIZED',
                };
            case 'ECONNABORTED':
                return {
                    success: false,
                    message: '',
                    errors: 'Ağ Bağlantısı Zaman Aşımı: Lütfen internet bağlantınızı kontrol edin.',
                };

            case 'NETWORK_ERROR':
                return {
                    success: false,
                    message: '',
                    errors: 'Ağ Bağlantı Hatası',
                };
        }
    }

    // Handle validation errors
    if (error && typeof error === 'object' && 'errors' in error) {
        const validationErrors = (error as { errors: Record<string, string[]> }).errors;
        let errorMessage = '';

        if (validationErrors && typeof validationErrors === 'object') {
            Object.entries(validationErrors).forEach(([field, messages]) => {
                if (Array.isArray(messages)) {
                    errorMessage += `${field}: ${messages.join(', ')}. `;
                }
            });
        }

        return {
            success: false,
            message: '',
            errors: errorMessage || 'Doğrulama hatası oluştu.',
        };
    }

    // Default error handling
    return {
        success: false,
        message: '',
        errors: error instanceof Error ? error.message : 'İşlem sırasında bir hata oluştu.',
    };
}
