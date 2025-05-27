import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationOptions {
    defaultPage?: number;
    defaultPageSize?: number;
}

export function usePagination(options: PaginationOptions = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { defaultPage = 1, defaultPageSize = 20 } = options;

    const parsePositiveInteger = (value: string | null, defaultValue: number): number => {
        if (!value) return defaultValue;
        const parsed = parseInt(value, 10);
        return (!isNaN(parsed) && parsed > 0) ? parsed : defaultValue;
    };

    const pageNumber = parsePositiveInteger(searchParams?.get('page') ?? null, defaultPage);
    const pageSize = parsePositiveInteger(searchParams?.get('pageSize') ?? null, defaultPageSize);
    const searchText = searchParams?.get('searchText') ?? '';
    const municipalStaffType = searchParams?.get('municipalStaffType') ?? undefined;

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

    const handleSearchTextChange = (searchText: string) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        if (searchText) {
            params.set('searchText', searchText);
        } else {
            params.delete('searchText');
        }
        params.set('page', '1'); // Reset to first page on search
        router.push(`?${params.toString()}`);
    }

    const handleMunicipalStaffTypeChange = (type: string | undefined) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        if (type) {
            params.set('municipalStaffType', type);
        } else {
            params.delete('municipalStaffType');
        }
        params.set('page', '1'); // Reset to first page on type change
        router.push(`?${params.toString()}`);
    };

    const handleClearSearch = () => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.delete('searchText');
        params.set('page', '1'); // Reset to first page on clear
        router.push(`?${params.toString()}`);
    }

    return {
        pageNumber,
        pageSize,
        handlePageChange,
        handlePageSizeChange,


        searchText,
        municipalStaffType,
        handleClearSearch,
        handleSearchTextChange,
        handleMunicipalStaffTypeChange,
    };
}
