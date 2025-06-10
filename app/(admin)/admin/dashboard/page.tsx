import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDashboardAdmin } from '@/app/actions';
import DashboardAdmin from '@/components/dashboard/adminDash';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page() {
    const response = await getDashboardAdmin();

    const breadcrumb = [{ label: 'Anasayfa' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <DashboardAdmin
                    dashboard={response.data}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
