import React from 'react';

// Define a type for breadcrumb items
type BreadcrumbItem = {
    label: string;
    href?: string;
};

export default function PageContainer({
    breadcrumb,
    children,
}: {
    breadcrumb: BreadcrumbItem[];
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <div className="flex-1 p-6 h-full overflow-auto bg-gray-100">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center mt-16">
                        {breadcrumb.map((item, index) => (
                            <React.Fragment key={index}>
                                {index > 0 && (
                                    <span className="mx-2">{'>'}</span>
                                )}
                                {item.href ? (
                                    <a
                                        href={item.href}
                                        className="hover:underline text-2xl font-bold mb-4 sm:mb-6">
                                        {item.label}
                                    </a>
                                ) : (
                                    <span className="text-2xl font-bold mb-4 sm:mb-6">
                                        {item.label}
                                    </span>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
