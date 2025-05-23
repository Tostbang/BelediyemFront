import React from 'react';

const FormSkeleton = () => {
    return (
        <div className="flex justify-center items-center min-h-[70vh] p-4">
            <div className="w-full bg-white shadow-lg rounded-xl p-8 border border-gray-100">
                <div className="animate-pulse">
                    <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto mb-6"></div>
                    <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-12 bg-gray-200 rounded-lg mb-4"></div>
                </div>
            </div>
        </div>
    );
};

export default FormSkeleton;
