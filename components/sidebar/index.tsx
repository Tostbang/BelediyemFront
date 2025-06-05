'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { SidebarItem } from '@/types';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Transition,
} from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';
import { deleteCookie } from '@/app/actions/cookies';
import AdminMuniLoading from '../common/adminMuniLoading';

const SideBar = ({ items }: { items: SidebarItem[] }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const adminAuthPaths = useMemo(
        () => ['/admin/login', '/admin/resetpassword'],
        []
    );
    const showSidebar = !adminAuthPaths.includes(pathname || '');

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'logout' && event.newValue === 'true') {
                if (!adminAuthPaths.includes(pathname || '')) {
                    //   logout();
                    router.push('/admin/login');
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [adminAuthPaths, pathname, router]);

    const handleLogout = () => {
        // logout();
        localStorage.setItem('logout', 'true');
        setTimeout(() => {
            localStorage.removeItem('logout');
        }, 500);
        router.push('/admin/login');
    };

    const handleLeaveMuniPanel = async () => {
        setIsTransitioning(true);
        await deleteCookie('municipalityId');
        setTimeout(() => {
            router.push('/admin/dashboard');
        }, 1000);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (!showSidebar) return null;

    return (
        <>
            {isTransitioning && (
                <AdminMuniLoading title=" Admin Paneline Dönülüyor" />
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 p-4 h-full bg-white transition-transform transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0 w-64 z-[700] mt-16`}>
                <div className="flex-1">
                    <nav className="space-y-1 px-2">
                        {items.map((item, index) => {
                            // If this item has children, render a disclosure (dropdown)
                            if (item.children && item.children.length > 0) {
                                return (
                                    <Disclosure
                                        as="div"
                                        key={item.path || `item-${index}`}
                                        className="mb-1">
                                        {({ open }) => (
                                            <>
                                                <DisclosureButton
                                                    className={`group cursor-pointer flex w-full items-center px-2 py-2 text-sm hover:bg-blue-600 hover:text-white font-medium rounded-md focus:outline-none ${
                                                        pathname === item.path
                                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                            : 'text-black'
                                                    }`}>
                                                    <span className="flex items-center gap-4 flex-grow">
                                                        <span className="w-4 h-4">
                                                            {item.icon}
                                                        </span>
                                                        <span>
                                                            {item.title}
                                                        </span>
                                                    </span>
                                                    <BiChevronDown
                                                        className={`ml-2 h-5 w-5 transform transition-transform duration-150 ${
                                                            open
                                                                ? 'rotate-90'
                                                                : ''
                                                        }`}
                                                    />
                                                </DisclosureButton>

                                                <Transition
                                                    enter="transition duration-100 ease-out"
                                                    enterFrom="transform scale-95 opacity-0"
                                                    enterTo="transform scale-100 opacity-100"
                                                    leave="transition duration-75 ease-out"
                                                    leaveFrom="transform scale-100 opacity-100"
                                                    leaveTo="transform scale-95 opacity-0">
                                                    <DisclosurePanel className="pl-4 pt-1 pb-1">
                                                        <div className="space-y-1">
                                                            {item.children &&
                                                                item.children.map(
                                                                    (
                                                                        child,
                                                                        childIndex
                                                                    ) => (
                                                                        <Link
                                                                            key={
                                                                                child.path ||
                                                                                `child-${index}-${childIndex}`
                                                                            }
                                                                            href={
                                                                                child.path ||
                                                                                '#'
                                                                            }
                                                                            className={`group cursor-pointer flex w-full items-center px-2 py-2 text-sm font-medium hover:bg-blue-600 hover:text-white rounded-md focus:outline-none ${
                                                                                pathname ===
                                                                                child.path
                                                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                                                    : 'text-black'
                                                                            }`}>
                                                                            <span className="flex items-center gap-4">
                                                                                <span className="w-4 h-4">
                                                                                    {
                                                                                        child.icon
                                                                                    }
                                                                                </span>
                                                                                <span>
                                                                                    {
                                                                                        child.title
                                                                                    }
                                                                                </span>
                                                                            </span>
                                                                        </Link>
                                                                    )
                                                                )}
                                                        </div>
                                                    </DisclosurePanel>
                                                </Transition>
                                            </>
                                        )}
                                    </Disclosure>
                                );
                            }

                            // Special item for leaving municipality panel
                            if (item.isLeaveMuniPanel) {
                                return (
                                    <button
                                        key={`leave-panel-${index}`}
                                        onClick={handleLeaveMuniPanel}
                                        disabled={isTransitioning}
                                        className={`group cursor-pointer flex w-full items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-blue-600 hover:text-white focus:outline-none text-black disabled:bg-gray-300 disabled:text-gray-500`}>
                                        <span className="flex items-center gap-4">
                                            <span className="w-4 h-4">
                                                {item.icon}
                                            </span>
                                            <span>{item.title}</span>
                                        </span>
                                    </button>
                                );
                            }

                            // Simple menu item (no children)
                            return item.isLogout ? (
                                <button
                                    key={item.path || `item-${index}`}
                                    onClick={handleLogout}
                                    className={`group cursor-pointer flex w-full items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-blue-600 hover:text-white focus:outline-none text-black`}>
                                    <span className="flex items-center gap-4">
                                        <span className="w-4 h-4">
                                            {item.icon}
                                        </span>
                                        <span>{item.title}</span>
                                    </span>
                                </button>
                            ) : (
                                <Link
                                    key={item.path || `item-${index}`}
                                    href={item.path || '#'}
                                    className={`group cursor-pointer flex w-full items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${
                                        pathname === item.path
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'text-black'
                                    }`}>
                                    <span className="flex items-center gap-4">
                                        <span className="w-4 h-4">
                                            {item.icon}
                                        </span>
                                        <span>{item.title}</span>
                                    </span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Hamburger button - positioned absolutely when sidebar is closed */}
            <button
                className="fixed top-4 left-4 p-2 cursor-pointer text-[#343C6A] md:hidden z-[850] bg-transparent rounded-md shadow-md"
                onClick={toggleSidebar}>
                <GiHamburgerMenu size={24} />
            </button>

            {/* Black transparent overlay */}
            <div
                className={`fixed inset-0 bg-black transition-all duration-300 ${
                    isSidebarOpen
                        ? 'opacity-60 z-40 visible'
                        : 'opacity-0 -z-10 invisible'
                }`}
                onClick={toggleSidebar}
                aria-hidden="true"
            />
        </>
    );
};

export default SideBar;
