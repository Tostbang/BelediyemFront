import { useRouter, useSearchParams } from 'next/navigation';

interface TabOptions {
    defaultTab?: string;
}

export function useTabs(options: TabOptions = {}) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { defaultTab = "1" } = options;

    const currentTab = searchParams?.get('tab') || defaultTab;

    const handleTabChange = (current: string) => {
        const params = new URLSearchParams(searchParams?.toString() ?? '');
        params.set('tab', current.toString());
        router.push(`?${params.toString()}`);
    };

    return {
        currentTab,
        handleTabChange,
    };
}
