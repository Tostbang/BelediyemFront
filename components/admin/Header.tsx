'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleProfilePopover = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <header className="bg-white h-16 px-4 flex items-center justify-between">
            <div className="flex"></div>
            <div className="relative">
                <button
                    onClick={toggleProfilePopover}
                    className="flex items-center space-x-2 focus:outline-none">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/placeholder-avatar.png"
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
                    <span className="text-gray-700 font-medium hidden sm:inline">
                        Admin
                    </span>
                    <svg
                        className="w-5 h-5 text-gray-500"
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

                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                        <Link
                            href="/admin/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Profil
                        </Link>
                        <Link
                            href="/admin/settings"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            Ayarlar
                        </Link>
                        <hr className="my-1" />
                        <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            Çıkış Yap
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}
