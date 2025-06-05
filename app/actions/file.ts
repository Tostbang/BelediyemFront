"use server"
import axiosInstance from "@/utils/axios";
import { validateBase64Size } from "@/utils/fileUtils";

export const uploadImage = async (formData: FormData) => {
    try {
        const image = formData.get('image') as string;

        if (!image) {
            return { success: false, message: "", errors: 'Görsel yüklenemedi.' };
        }

        const sizeValidation = validateBase64Size(image);
        if (!sizeValidation.valid) {
            return { success: false, message: "", errors: sizeValidation.message };
        }

        const base64Data = image.split(',')[1];
        const mimeType = image.split(';')[0].split(':')[1];

        const actualFormData = new FormData();

        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: mimeType });

        const extension = mimeType.split('/')[1];
        const fileName = `image_${Date.now()}.${extension}`;

        actualFormData.append('file', blob, fileName);

        // Don't specify Content-Type header for FormData
        const response = await axiosInstance.post('fileupload/uploadfile',
            actualFormData,
        );

        if (!response.data.url) {
            return { success: false, message: "", errors: 'Görsel yüklenemedi.' };
        }

        return {
            success: true,
            message: 'Görsel yüklendi.',
            path: response.data.url
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "",
            errors: error instanceof Error ? error.message : 'Görsel yüklenemedi.',
            path: ''
        };
    }
}
