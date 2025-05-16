import SideBar from '@/components/sidebar';
import Header from '@/components/admin/Header';
import { sidebarItemsStaff } from '@/data/sidebarItems';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar items={sidebarItemsStaff} />
            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 overflow-auto">{children}</main>
            </div>
        </div>
    );
}
