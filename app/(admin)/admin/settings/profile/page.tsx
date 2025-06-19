import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getInfoAdmin } from '@/app/actions';
import InfoFormAdmin from '@/components/admin/infoForm';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Admin Bilgileri');
}

export default async function Page() {
    const response = await getInfoAdmin();
    const breadcrumb = [{ label: 'Admin Bilgileri' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <InfoFormAdmin
                detail={response.data || null}
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
