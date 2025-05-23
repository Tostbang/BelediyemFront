import Header from '@/components/common/Header';
import SideBar from '@/components/sidebar';
import { sidebarItemsStaff } from '@/data/sidebarItems';
import { ReactNode } from 'react';
import { updateLastSeenStaff } from '../actions';

export default async function StaffLayout({
    children,
}: {
    children: ReactNode;
}) {
    try {
        await updateLastSeenStaff();
        console.log('Last seen status updated successfully.');
    } catch (error) {
        console.error('Failed to update last seen status:', error);
    }
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar items={sidebarItemsStaff} />
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
