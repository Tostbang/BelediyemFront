'use client';
import Image from 'next/image';
import { useState, CSSProperties } from 'react';

interface ImageWithSkeletonProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    layout?: 'fixed' | 'responsive' | 'fill' | 'intrinsic';
    className?: string;
    applyStyle?: boolean;
    priority?: boolean;
}

const ImageWithSkeleton = ({
    src,
    alt,
    width,
    height,
    fill = false,
    className = '',
    applyStyle = true,
    priority = false,
}: ImageWithSkeletonProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const containerStyle: CSSProperties | undefined = fill
        ? { position: 'relative', width: '100%', height: '100%' }
        : applyStyle
          ? { width: `${width}px`, height: `${height}px` }
          : undefined;

    return (
        <div
            className={`relative ${fill ? 'w-full h-full' : 'flex'}`}
            style={containerStyle}>
            {isLoading && !hasError && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
            )}

            {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 border border-gray-200 rounded">
                    <div className="text-center p-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="mx-auto h-8 w-8 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <p className="mt-1 text-xs text-gray-500">
                            Görsel yüklenemedi
                        </p>
                    </div>
                </div>
            ) : (
                <Image
                    src={src}
                    alt={alt}
                    width={fill ? undefined : width}
                    height={fill ? undefined : height}
                    fill={fill}
                    priority={priority}
                    onLoad={() => setIsLoading(false)}
                    onError={() => {
                        setIsLoading(false);
                        setHasError(true);
                    }}
                    className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
                />
            )}
        </div>
    );
};

export default ImageWithSkeleton;
