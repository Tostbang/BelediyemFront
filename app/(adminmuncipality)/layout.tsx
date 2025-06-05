import Header from '@/components/common/Header';
import SideBar from '@/components/sidebar';
import { sidebarItemsMuniAdmin } from '@/data/sidebarItems';
import { ReactNode } from 'react';

export default async function MunicipalityLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar items={sidebarItemsMuniAdmin} />
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
