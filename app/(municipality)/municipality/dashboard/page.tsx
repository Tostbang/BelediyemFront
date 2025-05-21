import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDashboardMuni } from '@/app/actions';
import DashboardMuni from '@/components/dashboard';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page() {
    const response = await getDashboardMuni();

    const breadcrumb = [{ label: 'Anasayfa' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            {response && <DashboardMuni dashboard={response} />}
        </PageContainer>
    );
}
