'use client';

import Link from 'next/link';
import React from 'react';

type SubmitButtonProps = {
    title: string;
    href: string;
};

export default function LinkButton({ title, href }: SubmitButtonProps) {
    return (
        <Link
            href={href}
            className="justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center cursor-pointer">
            {title}
        </Link>
    );
}
