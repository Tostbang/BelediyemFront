import React from 'react';

export default function Loading() {
    return (
        <>
            {/* Breadcrumb skeleton */}
            <div className="flex items-center mb-4 animate-pulse">
                <div className="h-6 w-24 bg-gray-200 rounded"></div>
            </div>

            {/* Title section skeleton */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 bg-white rounded-lg p-4 shadow-sm animate-pulse">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Chat list skeleton */}
                <div className="w-full lg:w-1/3 bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Header */}
                    <div className="p-3 bg-gray-50 border-b animate-pulse">
                        <div className="h-5 w-40 bg-gray-200 rounded"></div>
                    </div>

                    {/* Chat items */}
                    <div
                        className="overflow-y-auto"
                        style={{ maxHeight: '70vh' }}>
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="border-l-4 border-transparent p-4 border-b animate-pulse">
                                {/* Title and date */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-gray-200"></div>
                                        <div className="h-5 w-48 bg-gray-200 rounded"></div>
                                    </div>
                                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                </div>

                                {/* Owner */}
                                <div className="mt-1">
                                    <div className="h-3 w-32 bg-gray-200 rounded"></div>
                                </div>

                                {/* Message preview */}
                                <div className="h-4 w-full bg-gray-200 rounded mt-2"></div>

                                {/* Last message info */}
                                <div className="flex justify-between mt-2">
                                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                                    <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination skeleton */}
                    <div className="flex justify-center p-4 border-t">
                        <div className="h-8 w-48 bg-gray-200 rounded"></div>
                    </div>
                </div>

                {/* Chat area skeleton */}
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm">
                    <div className="flex flex-col h-full">
                        {/* Messages area */}
                        <div className="relative border border-gray-200 rounded p-4 flex-grow">
                            <div
                                className="overflow-y-auto pr-2 flex items-center justify-center"
                                style={{ height: '70vh' }}>
                                <div className="text-center animate-pulse">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-12 w-12 mx-auto text-gray-300"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                        />
                                    </svg>
                                    <div className="h-4 w-48 bg-gray-200 rounded mt-2 mx-auto"></div>
                                </div>
                            </div>
                        </div>

                        {/* Message input skeleton */}
                        <div className="flex gap-2 items-center mt-2">
                            <div className="flex-grow p-4 h-12 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-12 w-24 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
