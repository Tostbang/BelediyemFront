'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function LoginListener() {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'login' && event.newValue) {
                try {
                    const loginData = JSON.parse(event.newValue);
                    // Only redirect if we're not on the same page already and not on a dashboard
                    if (
                        !pathname?.includes('dashboard') &&
                        !pathname?.startsWith(loginData.redirectPath)
                    ) {
                        router.push(loginData.redirectPath);
                    }
                } catch (error) {
                    console.error('Error parsing login data', error);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [pathname, router]);

    return null; // This component doesn't render anything
}
