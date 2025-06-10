import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import DashboardStaff from '@/components/dashboard/staffDash';
import { getDashboardStaff } from '@/app/actions';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page() {
    const response = await getDashboardStaff();

    const breadcrumb = [{ label: 'Anasayfa' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <DashboardStaff
                    dashboard={response.data}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
