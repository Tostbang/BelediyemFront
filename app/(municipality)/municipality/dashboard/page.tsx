import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDashboardMuni } from '@/app/actions';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page() {
    const dashboard = await getDashboardMuni();

    const breadcrumb = [{ label: 'Anasayfa' }];

    return <PageContainer breadcrumb={breadcrumb}>Dashboard</PageContainer>;
}
