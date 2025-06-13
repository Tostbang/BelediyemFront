'use client';
import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Popover } from 'antd';
import { getClientCookie, logout, safelyParseJSON } from '@/utils/auth';
import { handleLogoutMuni } from '@/app/actions/municipality/auth';
import { handleLogoutStaf } from '@/app/actions/staff/auth';
import { handleLogoutAdmin } from '@/app/actions';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { User } from '@/types';
import ImageWithSkeleton from '../common/imageSkeleton';

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { handleError, handleSuccess } = useNotificationHandler();

    useEffect(() => {
        const userData = getClientCookie('user');
        const parsedUser = safelyParseJSON<User>(userData);
        setUserDetails(parsedUser);
    }, []);

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
        if (isLoggingOut) return; // Prevent multiple clicks

        setIsLoggingOut(true);
        let result;

        try {
            if (pathname?.startsWith('/admin')) {
                result = await handleLogoutAdmin();
            } else if (pathname?.startsWith('/municipality')) {
                result = await handleLogoutMuni();
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
        } catch (error) {
            console.error('Logout error:', error);
            handleError({
                success: false,
                message: 'Çıkış işlemi sırasında hata oluştu.',
            });
        } finally {
            setIsLoggingOut(false);
        }
    };

    let url;
    if (userDetails?.role === 2) {
        url = '/admin/settings/profile';
    } else if (userDetails?.role === 3) {
        url = '/municipality/settings/profile';
    } else if (userDetails?.role === 4) {
        url = '/staff/settings/profile';
    } else {
        url = '/';
    }

    const handleProfileClick = () => {
        router.push(url);
        setIsProfileOpen(false);
    };

    const profileContent = (
        <div className="w-48 py-1">
            <button
                onClick={handleProfileClick}
                className="w-full cursor-pointer text-left block px-4 py-2 text-sm text-gray-700! hover:bg-gray-100!">
                Profil
            </button>
            <hr className="my-1" />
            <button
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleLogout}
                disabled={isLoggingOut}>
                {isLoggingOut ? 'Çıkış Yapılıyor...' : 'Çıkış Yap'}
            </button>
        </div>
    );

    return (
        <header className="fixed top-0 w-full bg-white h-16 px-4 flex items-center justify-between z-[800]">
            <div className="w-full p-4 mt-2 flex items-center gap-3 ml-8 md:ml-0">
                {(!userDetails || userDetails.role !== 4) && (
                    <ImageWithSkeleton
                        src={
                            !userDetails
                                ? '/assets/logo.svg'
                                : userDetails.role === 4
                                  ? userDetails?.profileImage ||
                                    '/assets/logo.svg'
                                  : userDetails.role === 3
                                    ? userDetails?.logoImage ||
                                      '/assets/logo.svg'
                                    : '/assets/logo.svg'
                        }
                        alt="Profile"
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                )}

                <div className="font-bold">
                    {!userDetails
                        ? 'TOSTBANG A.Ş.'
                        : userDetails.role === 3
                          ? userDetails.name || 'Belediye'
                          : userDetails.role === 4
                            ? userDetails.municipalityName || 'Belediye'
                            : 'TOSTBANG A.Ş.'}
                </div>
            </div>
            <Popover
                content={profileContent}
                trigger="click"
                className='w-full flex items-center justify-end'
                open={isProfileOpen}
                onOpenChange={setIsProfileOpen}
                placement="bottomRight">
                <div className="relative cursor-pointer">
                    <button
                        onClick={toggleProfilePopover}
                        className="flex items-center space-x-2 focus:outline-none cursor-pointer">
                        {userDetails?.role === 2 ||
                        userDetails?.role === 3 ? null : userDetails?.role ===
                          4 ? (
                            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                <ImageWithSkeleton
                                    src={
                                        userDetails?.profileImage ||
                                        '/assets/logo.svg'
                                    }
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : null}
                        <span className="text-gray-700 font-medium cursor-pointer">
                            {!userDetails
                                ? ''
                                : userDetails.role === 2
                                  ? 'Admin Profil'
                                  : userDetails.role === 3
                                    ? 'Profil'
                                    : userDetails.role === 4
                                      ? userDetails.name +
                                            ' ' +
                                            userDetails.surname ||
                                        'Personel Adı'
                                      : 'Kullanıcı'}
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
