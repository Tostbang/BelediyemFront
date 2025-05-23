'use client';
import React, { useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import toast from 'react-hot-toast';
import { Slider } from 'antd';
import Modal from '../common/modal';

interface CropImageModalProps {
    open: boolean;
    onClose: () => void;
    onCropComplete: (file: File) => void;
    initialImage: string | File;
    targetWidth?: number;
    targetHeight?: number;
}

interface AspectRatioOption {
    label: string;
    value: number;
}

export const DynamicCropImageModal: React.FC<CropImageModalProps> = ({
    open,
    onClose,
    onCropComplete,
    initialImage,
    targetWidth = 800,
    targetHeight = 800,
}) => {
    const cropperRef = useRef<ReactCropperElement>(null);
    const [aspectRatio, setAspectRatio] = useState<number>(1);

    const handleClose = (): void => {
        onClose();
        setAspectRatio(1);
    };

    const handleCropComplete = (): void => {
        if (cropperRef.current) {
            const cropper = cropperRef.current.cropper;
            const croppedCanvas = cropper.getCroppedCanvas({
                width: targetWidth,
                height: targetHeight,
            });

            croppedCanvas.toBlob(
                (blob: Blob | null) => {
                    if (blob) {
                        const croppedFile = new File(
                            [blob],
                            'cropped-image.png',
                            {
                                type: 'image/png',
                            }
                        );
                        onCropComplete(croppedFile);
                        handleClose();
                    }
                },
                'image/png',
                1
            );
        }
    };

    const handleAddOriginal = (): void => {
        if (initialImage instanceof File) {
            onCropComplete(initialImage);
            handleClose();
        } else {
            fetch(initialImage)
                .then((res) => res.blob())
                .then((blob) => {
                    const file = new File([blob], 'original-image.png', {
                        type: 'image/png',
                    });
                    onCropComplete(file);
                    handleClose();
                })
                .catch((error) => {
                    console.error('Resim dönüştürme hatası:', error);
                    toast.error('Resim eklenirken bir hata oluştu.');
                });
        }
    };

    const aspectRatios: AspectRatioOption[] = [
        { label: 'Kare (1:1)', value: 1 },
        { label: '16:9', value: 16 / 9 },
        { label: '4:3', value: 4 / 3 },
        { label: '3:2', value: 3 / 2 },
        { label: 'Serbest', value: 0 },
    ];

    return (
        <Modal isOpen={open} onClose={handleClose}>
            <h2 className="text-xl font-medium mb-4">
                Görseli Kırp (
                {aspectRatio
                    ? `${Math.round(aspectRatio * 100) / 100}:1`
                    : 'Serbest'}
                )
            </h2>

            <div className="mb-4">
                <select
                    className="border border-gray-300 rounded-md py-1 px-2 text-sm"
                    value={aspectRatio}
                    onChange={(e) => setAspectRatio(Number(e.target.value))}>
                    {aspectRatios.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Hedef Çözünürlük: {targetWidth} x {targetHeight}px
                </p>
            </div>

            <div className="w-full flex justify-center items-center overflow-hidden bg-gray-100 rounded-md">
                <Cropper
                    ref={cropperRef}
                    src={
                        typeof initialImage === 'string'
                            ? initialImage
                            : URL.createObjectURL(initialImage)
                    }
                    className="max-w-full w-full h-[50vh] min-h-[300px] max-h-[600px] object-contain"
                    aspectRatio={aspectRatio || undefined}
                    guides={true}
                    dragMode="move"
                    viewMode={1}
                    autoCropArea={1}
                    responsive={true}
                    zoomOnWheel={true}
                    wheelZoomRatio={0.1}
                    scalable={true}
                    scrolling="true"
                    zoomable={true}
                    key={aspectRatio}
                    minCropBoxHeight={10}
                    minCropBoxWidth={10}
                    background={false}
                    checkOrientation={false}
                />
            </div>

            <div className="mt-4 w-full">
                <div className="flex justify-between items-center">
                    <p className="text-sm mb-1">Yakınlaştır</p>
                    <button
                        onClick={() => {
                            if (cropperRef.current) {
                                cropperRef.current.cropper.reset();
                            }
                        }}
                        className="text-xs text-blue-600 hover:text-blue-700">
                        Yakınlaştırmayı Sıfırla
                    </button>
                </div>

                <Slider
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    min={0.1}
                    max={3}
                    step={0.1}
                    onChange={(value) => {
                        if (cropperRef.current) {
                            const cropper = cropperRef.current.cropper;
                            cropper?.zoomTo(value);
                        }
                    }}
                />
            </div>

            <div className="mt-4 flex gap-4">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md cursor-pointer"
                    onClick={handleCropComplete}>
                    Kırp ve Kaydet
                </button>
                <button
                    className="border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer"
                    onClick={handleAddOriginal}>
                    Olduğu Gibi Ekle
                </button>
                <button
                    className="border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-md cursor-pointer"
                    onClick={handleClose}>
                    İptal
                </button>
            </div>
        </Modal>
    );
};

export default DynamicCropImageModal;
