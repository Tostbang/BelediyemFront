import React, { RefObject, useState, useEffect } from 'react';
import { SearchIcon, XIcon } from '../icons';

interface SearchFilter {
    onFilter: () => void;
    onClear?: () => void;
    searchInputRef: RefObject<HTMLInputElement>;
    searchText?: string;
}

const SearchFilter: React.FC<SearchFilter> = ({
    onFilter,
    onClear,
    searchInputRef,
    searchText,
}) => {
    const [hasText, setHasText] = useState<boolean>(!!searchText);

    useEffect(() => {
        setHasText(!!searchText && searchText.trim() !== '');
    }, [searchText]);

    const handleClear = () => {
        if (onClear) {
            onClear();
        }
        if (searchInputRef.current) {
            searchInputRef.current.value = '';
            setHasText(false);
        }
    };

    const handleInput = () => {
        setHasText(!!searchInputRef.current?.value);
    };

    const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            onFilter();
        }
    };

    return (
        <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full flex-grow">
                <div className="flex items-center">
                    <button
                        onClick={onFilter}
                        className="flex items-center justify-center text-gray-400 p-3 h-10 lg:h-20 hover:text-blue-400 cursor-pointer">
                        <span className="w-5 h-5">
                            <SearchIcon />
                        </span>
                    </button>

                    <input
                        type="text"
                        placeholder="Arama..."
                        defaultValue={searchText || ''}
                        ref={searchInputRef}
                        onKeyDown={handleKeyDown}
                        onInput={handleInput}
                        className="h-10 lg:h-12 w-full outline-none px-2 text-sm sm:text-base"
                    />

                    {hasText && (
                        <button
                            onClick={handleClear}
                            className="flex items-center justify-center text-gray-400 p-3 h-10 lg:h-20 hover:text-red-500  cursor-pointer transition-colors">
                            <span className="w-5 h-5">
                                <XIcon />
                            </span>
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchFilter;
