import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getInfoMuni } from '@/app/actions';
import InfoFormMuni from '@/components/muni/infoForm';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Belediye Bilgileri');
}

export default async function Page() {
    const response = await getInfoMuni();
    const breadcrumb = [{ label: 'Belediye Bilgileri' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <InfoFormMuni
                detail={response.data || null}
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
