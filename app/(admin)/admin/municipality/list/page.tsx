import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Belediye Listesi');
}

export default async function Page() {
    // const dashboard = await getAdminDashboard();

    const breadcrumb = [{ label: 'Belediye Listesi' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>Belediye Listesi</PageContainer>
    );
}
