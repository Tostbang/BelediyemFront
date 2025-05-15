import SideBar from '@/components/sidebar';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex h-screen overflow-hidden">
            <SideBar />
            <main className="flex-1 overflow-auto">{children}</main>
        </div>
    );
}
