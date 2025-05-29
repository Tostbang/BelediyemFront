import { BreadcrumbItem } from '@/types';
import Link from 'next/link';
import React from 'react';

export default function Breadcrumb({
    breadcrumb,
    buttonComponent,
}: {
    breadcrumb: BreadcrumbItem[];
    buttonComponent?: React.ReactNode;
}) {
    return (
        <div
            className={`w-full flex flex-wrap items-center mt-16  mb-6 gap-y-2 ${
                buttonComponent ? 'justify-between' : ''
            }`}>
            <div>
                {breadcrumb.map((item, index) => (
                    <React.Fragment key={index}>
                        {index > 0 && (
                            <span className="mx-2 text-3xl">{'>'}</span>
                        )}
                        {item.href ? (
                            <Link
                                href={item.href}
                                className="hover:underline text-2xl font-bold">
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={`text-2xl font-bold ${
                                    breadcrumb.length === 1
                                        ? 'opacity-100'
                                        : 'opacity-80'
                                }`}>
                                {item.label}
                            </span>
                        )}
                    </React.Fragment>
                ))}
            </div>

            {buttonComponent && buttonComponent}
        </div>
    );
}
