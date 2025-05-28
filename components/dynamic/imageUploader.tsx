'use client';
import React, { useState, useRef } from 'react';
import DynamicCropImageModal from './cropImageModal';
import { validateImageSize } from '@/utils/fileUtils';
import { useFormStatus } from 'react-dom';
import ImageWithSkeleton from '../common/imageSkeleton';

interface ImageUploaderProps {
    name: string; // Form field name for server actions
    onImageChange?: (file: File | null) => void; // Updated to handle null for deletion
    initialImage?: string | null;
    targetWidth?: number;
    targetHeight?: number;
    label?: string;
    previewLabel?: string;
    required?: boolean;
}

export default function ImageUploader({
    name,
    onImageChange,
    initialImage = null,
    targetWidth = 1920,
    targetHeight = 1080,
    label = 'Görsel',
    previewLabel = 'Önizleme:',
    required = false,
}: ImageUploaderProps) {
    const { pending } = useFormStatus();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | string | null>(
        null
    );
    const [croppedImage, setCroppedImage] = useState<string | null>(
        initialImage
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const hiddenFileInputRef = useRef<HTMLInputElement>(null);
    const [base64Image, setBase64Image] = useState<string | null>(null);

    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setErrorMessage(null);

            const file = e.target.files[0];
            const validation = validateImageSize(file);

            if (!validation.valid) {
                setErrorMessage(validation.message ?? null);
                if (hiddenFileInputRef.current) {
                    hiddenFileInputRef.current.value = '';
                }
                return;
            }

            setSelectedImage(file);
            setIsModalOpen(true);
        }
    };

    const handleCropComplete = (file: File) => {
        setCroppedImage(URL.createObjectURL(file));

        // Convert to base64 for server action submission
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result as string;
            setBase64Image(base64);

            // If we have a hidden input, update its value
            if (fileInputRef.current) {
                fileInputRef.current.value = base64;
            }

            // Optional callback for client-side handling
            if (onImageChange) {
                onImageChange(file);
            }
        };
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
    };

    const triggerFileInput = () => {
        hiddenFileInputRef.current?.click();
    };

    const handleDeleteImage = () => {
        setSelectedImage(null);
        setCroppedImage(null);
        setBase64Image(null);
        setErrorMessage(null);

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }

        if (hiddenFileInputRef.current) {
            hiddenFileInputRef.current.value = '';
        }

        if (onImageChange) {
            onImageChange(null);
        }
    };

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {label}
                </label>

                {/* Hidden real file input */}
                <input
                    type="file"
                    accept="image/*"
                    name={`${name}_file_input`}
                    ref={hiddenFileInputRef}
                    onChange={handleImageSelect}
                    className="hidden"
                    aria-hidden="true"
                />

                {/* Hidden input to store base64 image data for server action forms */}
                <input
                    type="hidden"
                    name={name}
                    ref={fileInputRef}
                    value={
                        base64Image ||
                        (initialImage && croppedImage ? initialImage : '')
                    }
                    required={required && !base64Image && !croppedImage}
                />

                <div className="flex items-center gap-3">
                    {/* Custom upload button */}
                    <button
                        type="button"
                        onClick={triggerFileInput}
                        className="flex items-center cursor-pointer justify-center w-12 h-12 bg-gray-100 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 4v16m8-8H4"
                            />
                        </svg>
                    </button>

                    {/* Image name or instruction */}
                    <span className="text-sm text-gray-500">
                        {croppedImage
                            ? 'Görsel seçildi'
                            : 'Görsel seçmek için tıklayın'}
                    </span>

                    {/* Delete button - only shown when an image is selected */}
                    {croppedImage && !pending && (
                        <button
                            type="button"
                            onClick={handleDeleteImage}
                            className="flex items-center justify-center w-8 h-8 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
                            aria-label="Delete image">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-red-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Display error message */}
                {errorMessage && (
                    <p className="mt-2 text-sm text-red-600">{errorMessage}</p>
                )}
            </div>

            {croppedImage && (
                <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-1">
                        {previewLabel}
                    </p>
                    <div className="w-full h-64 bg-gray-50 rounded-md border border-gray-200 overflow-hidden flex items-center justify-center">
                        <ImageWithSkeleton
                            src={croppedImage}
                            alt="Kırpılan görsel"
                            width={800}
                            height={300}
                            className="w-full h-full object-contain"
                            skipUrlValidation={true} // Skip URL validation for cropped images
                        />
                    </div>
                </div>
            )}

            {selectedImage && (
                <DynamicCropImageModal
                    open={isModalOpen}
                    onClose={handleModalClose}
                    onCropComplete={handleCropComplete}
                    initialImage={selectedImage}
                    targetWidth={targetWidth}
                    targetHeight={targetHeight}
                />
            )}
        </div>
    );
}
