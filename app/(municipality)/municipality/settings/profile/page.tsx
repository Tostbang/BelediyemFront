import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getInfoMun } from '@/app/actions';
import InfoForm from '@/components/muni/infoForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Belediye Bilgileri');
}

export default async function Page() {
    const response = await getInfoMun();
    const breadcrumb = [{ label: 'Belediye Bilgileri' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            {response && <InfoForm detail={response} />}
        </PageContainer>
    );
}
