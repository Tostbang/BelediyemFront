import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import DashboardStaff from '@/components/dashboard/staffDash';
import { getDashboardStaff } from '@/app/actions';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page() {
    const response = await getDashboardStaff();

    const breadcrumb = [{ label: 'Anasayfa' }];

    return (
        <PageContainer>
            {response && (
                <DashboardStaff dashboard={response} breadcrumb={breadcrumb} />
            )}
        </PageContainer>
    );
}
