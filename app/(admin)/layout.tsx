import SideBar from '@/components/sidebar';
import { sidebarItemsAdmin } from '@/data/sidebarItems';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar items={sidebarItemsAdmin} />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
