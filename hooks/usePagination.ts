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

    const currentPage = parsePositiveInteger(searchParams?.get('page') ?? null, defaultPage);
    const pageSize = parsePositiveInteger(searchParams?.get('pageSize') ?? null, defaultPageSize);

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

    return {
        currentPage,
        pageSize,
        handlePageChange,
        handlePageSizeChange,
    };
}
