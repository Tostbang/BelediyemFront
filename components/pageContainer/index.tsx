import React from 'react';

export default function PageContainer({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen">
            <div className="flex-1 p-6 h-full overflow-auto bg-[#F5F6FA]">
                {children}
            </div>
        </div>
    );
}
