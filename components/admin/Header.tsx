'use client';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Popover } from 'antd';
import { logout } from '@/utils/auth';
import { handleLogoutMun } from '@/app/actions/municipality/auth';
import { handleLogoutStaf } from '@/app/actions/staff/auth';
import { handleLogoutAdmin } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { handleError, handleSuccess } = useNotificationHandler();

    const authPaths = useMemo(
        () => ['/login', '/login/admin', '/login/municipality', '/login/staff'],
        []
    );

    const toggleProfilePopover = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'logout' && event.newValue === 'true') {
                if (!authPaths.includes(pathname || '')) {
                    logout();
                    router.push('/login');
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [authPaths, pathname, router]);

    const handleLogout = async () => {
        let result;

        if (pathname?.startsWith('/admin')) {
            result = await handleLogoutAdmin();
        } else if (pathname?.startsWith('/municipality')) {
            result = await handleLogoutMun();
        } else if (pathname?.startsWith('/staff')) {
            result = await handleLogoutStaf();
        }

        if (result && result.success) {
            handleSuccess(result.message);
            logout();
            localStorage.setItem('logout', 'true');
            setTimeout(() => {
                localStorage.removeItem('logout');
            }, 500);

            // Redirect to appropriate login page based on current path
            if (pathname?.startsWith('/admin')) {
                router.push('/login/admin');
            } else if (pathname?.startsWith('/municipality')) {
                router.push('/login/municipality');
            } else if (pathname?.startsWith('/staff')) {
                router.push('/login/staff');
            } else {
                router.push('/login');
            }
        } else if (result) {
            handleError(result);
        } else {
            handleError({
                success: false,
                message: 'Çıkış işlemi başarısız oldu.',
            });
        }
    };

    const profileContent = (
        <div className="w-48 py-1">
            <Link
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700! hover:bg-gray-100!">
                Profil
            </Link>
            <Link
                href="/admin/settings"
                className="block px-4 py-2 text-sm text-gray-700! hover:bg-gray-100!">
                Ayarlar
            </Link>
            <hr className="my-1" />
            <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}>
                Çıkış Yap
            </button>
        </div>
    );

    return (
        <header className="fixed top-0 w-full bg-white h-16 px-4 flex items-center justify-between z-[2000]">
            <div className="flex"></div>
            <Popover
                content={profileContent}
                trigger="click"
                open={isProfileOpen}
                onOpenChange={setIsProfileOpen}
                placement="bottomRight">
                <div className="relative cursor-pointer">
                    <button
                        onClick={toggleProfilePopover}
                        className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            <Image
                                src="/logo.svg"
                                alt="Profile"
                                width={40}
                                height={40}
                                className="object-cover"
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'%3E%3C/path%3E%3Ccircle cx='12' cy='7' r='4'%3E%3C/circle%3E%3C/svg%3E";
                                }}
                            />
                        </div>
                        <span className="text-gray-700 font-medium hidden sm:inline cursor-pointer">
                            Admin
                        </span>
                        <svg
                            className="w-5 h-5 text-gray-500 cursor-pointer"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            </Popover>
        </header>
    );
}
