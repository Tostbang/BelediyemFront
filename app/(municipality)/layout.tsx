import Header from '@/components/common/Header';
import SideBar from '@/components/sidebar';
import { sidebarItemsMuni } from '@/data/sidebarItems';
import { ReactNode } from 'react';
import { updateLastSeenMuni } from '../actions';

export default async function MunicipalityLayout({
    children,
}: {
    children: ReactNode;
}) {
    try {
        await updateLastSeenMuni();
        console.log('Last seen status updated successfully.');
    } catch (error) {
        console.error('Failed to update last seen status:', error);
    }
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar items={sidebarItemsMuni} />
            <Header />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
