'use client';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
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

const SideBar = ({ items }: { items: SidebarItem[] }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    if (!showSidebar) return null;

    return (
        <>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 p-4 h-full bg-white text-[#B1B1B1] transition-transform transform ${
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:relative md:translate-x-0 w-64 z-[2500]`}>
                {/* Logo and company name */}
                <div className="w-full p-4 flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded">
                        <span className="font-bold text-sm text-gray-500">
                            logo
                        </span>
                    </div>
                    <div className="font-bold text-red-600">TOSTBANG A.Ş.</div>
                </div>
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
                                                        <span>{item.icon}</span>
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
                                                                        <button
                                                                            key={
                                                                                child.path ||
                                                                                `child-${index}-${childIndex}`
                                                                            }
                                                                            onClick={() => {
                                                                                if (
                                                                                    child.path
                                                                                ) {
                                                                                    router.push(
                                                                                        child.path
                                                                                    );
                                                                                }
                                                                            }}
                                                                            className={`group cursor-pointer flex w-full items-center px-2 py-2 text-sm font-medium hover:bg-blue-600 hover:text-white rounded-md focus:outline-none ${
                                                                                pathname ===
                                                                                child.path
                                                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                                                    : 'text-black'
                                                                            }`}>
                                                                            <span className="flex items-center gap-4">
                                                                                <span>
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
                                                                        </button>
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

                            // Simple menu item (no children)
                            return (
                                <button
                                    key={item.path || `item-${index}`}
                                    onClick={() => {
                                        if (item.isLogout) {
                                            handleLogout();
                                            return;
                                        }
                                        if (item.path) {
                                            router.push(item.path);
                                        }
                                    }}
                                    className={`group cursor-pointer flex w-full items-center px-2 py-2 text-sm font-medium rounded-md hover:bg-blue-600 hover:text-white focus:outline-none ${
                                        pathname === item.path
                                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                                            : 'text-black'
                                    }`}>
                                    <span className="flex items-center gap-4">
                                        <span>{item.icon}</span>
                                        <span>{item.title}</span>
                                    </span>
                                </button>
                            );
                        })}
                    </nav>
                </div>
            </div>

            {/* Hamburger button - positioned absolutely when sidebar is closed */}
            {!isSidebarOpen && (
                <button
                    className="fixed top-4 left-4 p-2 text-[#343C6A] md:hidden z-[2500] bg-transparent rounded-md shadow-md"
                    onClick={toggleSidebar}>
                    <GiHamburgerMenu size={24} />
                </button>
            )}

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
