import React from 'react';

interface ClearAllFiltersProps {
    handleClear: () => void;
}

export default function ClearAllFilters({ handleClear }: ClearAllFiltersProps) {
    return (
        <button
            onClick={handleClear}
            className="cursor-pointer bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors duration-200 w-full sm:w-auto text-sm sm:text-base my-2 lg:my-0">
            Filtreleri Temizle
        </button>
    );
}
