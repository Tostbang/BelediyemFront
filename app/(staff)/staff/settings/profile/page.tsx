import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getInfoStaff } from '@/app/actions';
import InfoFormStaff from '@/components/staff/infoForm';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Personel Bilgileri');
}

export default async function Page() {
    const response = await getInfoStaff();
    const breadcrumb = [{ label: 'Personel Bilgileri' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
                <InfoFormStaff detail={response.data ||null} breadcrumb={breadcrumb} />
        </PageContainer>
    );
}
