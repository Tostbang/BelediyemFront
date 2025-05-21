import SideBar from '@/components/sidebar';
import Header from '@/components/admin/Header';
import { sidebarItemsStaff } from '@/data/sidebarItems';
import { ReactNode } from 'react';

export default function StaffLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar items={sidebarItemsStaff} />
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
