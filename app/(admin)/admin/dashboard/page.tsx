import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDashboardAdmin } from '@/app/actions';
import DashboardAdmin from '@/components/dashboard/adminDash';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page() {
    const response = await getDashboardAdmin();

    const breadcrumb = [{ label: 'Anasayfa' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            {response && <DashboardAdmin dashboard={response} />}
        </PageContainer>
    );
}
