import { useRouter, useSearchParams } from 'next/navigation';
import { RefObject } from 'react';

// Define filter types and their configuration
type FilterType = 'string' | 'integer' | 'date' | 'boolean';

interface FilterConfig {
    type: FilterType;
    defaultValue?: string | number | null;
}

interface PaginationOptions {
    defaultPage?: number;
    defaultPageSize?: number;
    filterParams?: string[];
    filterConfig?: Record<string, FilterConfig>; // Configuration for each filter
    searchInputRef?: RefObject<HTMLInputElement>;
    startDateRef?: RefObject<HTMLInputElement>;
    endDateRef?: RefObject<HTMLInputElement>;
}

export function usePagination(options: PaginationOptions = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        defaultPage = 1,
        defaultPageSize = 20,
        filterParams = [],
        searchInputRef,
        startDateRef,
        endDateRef,
    } = options;

    const parsePositiveInteger = (value: string | null, defaultValue: number): number => {
        if (!value) return defaultValue;
        const parsed = parseInt(value, 10);
        return (!isNaN(parsed) && parsed > 0) ? parsed : defaultValue;
    };

    const pageNumber = parsePositiveInteger(searchParams?.get('page') ?? null, defaultPage);
    const pageSize = parsePositiveInteger(searchParams?.get('pageSize') ?? null, defaultPageSize);

    const filters: Record<string, string | number | boolean | undefined> = {};

    filterParams.forEach(param => {
        filters[param] = searchParams?.get(param) ?? undefined;
    });
    
    // Calculate the filter count
    const filterCount = Object.values(filters).filter(
        value => value !== undefined && value !== ''
    ).length;

    const handlePageChange = (page: number, size: number) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.set('page', page.toString());
        params.set('pageSize', size.toString());
        router.push(`?${params.toString()}`);
    };

    const handlePageSizeChange = (current: number, size: number) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.set('page', current.toString());
        params.set('pageSize', size.toString());
        router.push(`?${params.toString()}`);
    };

    const handleFilterChange = (filterName: string, value: string | number | undefined | null) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');

        if (value !== undefined && value !== null && value !== '') {
            params.set(filterName, value.toString());
        } else {
            params.delete(filterName);
        }

        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const handleSearch = () => {
        if (searchInputRef?.current) {
            const searchText = searchInputRef.current.value;
            handleFilterChange('searchText', searchText);
        }
    };

    const handleClearSearch = () => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.delete('searchText');
        params.set('page', '1');
        router.push(`?${params.toString()}`);

        if (searchInputRef?.current) {
            searchInputRef.current.value = '';
        }
    }


    const handleClearAllFilters = () => {
        const params = new URLSearchParams();
        params.set('page', '1');
        params.set('pageSize', pageSize.toString());
        router.push(`?${params.toString()}`);

        if (searchInputRef?.current) {
            searchInputRef.current.value = '';
        }
        if (startDateRef?.current) {
            startDateRef.current.value = '';
        }
        if (endDateRef?.current) {
            endDateRef.current.value = '';
        }
    };

    const handleDateFilter = () => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');

        if (startDateRef?.current) {
            const startDate = startDateRef.current.value;
            if (startDate) {
                params.set('startDate', startDate);
            } else {
                params.delete('startDate');
            }
        }

        if (endDateRef?.current) {
            const endDate = endDateRef.current.value;
            if (endDate) {
                params.set('endDate', endDate);
            } else {
                params.delete('endDate');
            }
        }

        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const handleClearDateFilters = () => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.delete('startDate');
        params.delete('endDate');
        params.set('page', '1');
        router.push(`?${params.toString()}`);

        if (startDateRef?.current) {
            startDateRef.current.value = '';
        }
        if (endDateRef?.current) {
            endDateRef.current.value = '';
        }
    }



    return {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
        handleClearSearch,
        handleClearAllFilters,
        filters,
        filterCount,
        handleFilterChange,
        handleDateFilter,
        handleClearDateFilters,
    };
}
