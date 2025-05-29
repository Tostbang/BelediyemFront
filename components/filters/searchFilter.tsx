import React, { RefObject } from 'react';
import { SearchIcon, TrashIcon } from '../icons';

interface SearchFilter {
    onFilter: () => void;
    onClear?: () => void; // New prop for clearing filters
    searchInputRef: RefObject<HTMLInputElement>;
    searchText?: string;
}

const SearchFilter: React.FC<SearchFilter> = ({
    onFilter,
    onClear,
    searchInputRef,
    searchText,
}) => {
    const handleClear = () => {
        if (onClear) {
            onClear();
        }
    };

    return (
        <div className="flex items-center w-full sm:w-auto">
            <input
                type="text"
                placeholder="Arama..."
                defaultValue={searchText || ''}
                ref={searchInputRef}
                className="border border-gray-300 border-r-transparent rounded-l p-2 flex-grow w-full sm:w-64"
            />
            <div className="flex items-center">
                <button
                    onClick={onFilter}
                    className="border border-gray-300 border-r-0 flex items-center cursor-pointer justisfy-center bg-blue-500 hover:bg-blue-600 text-white p-2 h-full min-w-[41px]">
                    <SearchIcon />
                </button>
                <button
                    onClick={handleClear}
                    className="border border-y-gray-300 border-l-0 border-r-gray-300  flex items-center cursor-pointer justify-center bg-red-500 hover:bg-red-600 text-white p-2 h-full min-w-[41px] rounded-r">
                    <TrashIcon />
                </button>
            </div>
        </div>
    );
};

export default SearchFilter;
