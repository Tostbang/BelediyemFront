import Header from '@/components/common/Header';
import SideBar from '@/components/sidebar';
import { sidebarItemsAdmin } from '@/data/sidebarItems';
import { ReactNode } from 'react';
import { updateLastSeenAdmin } from '@/app/actions/admin/auth';

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    try {
        await updateLastSeenAdmin();
        console.log('Last seen status updated successfully.');
    } catch (error) {
        console.error('Failed to update last seen status:', error);
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar items={sidebarItemsAdmin} />
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
