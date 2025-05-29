import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getInfoAdmin } from '@/app/actions';
import InfoFormAdmin from '@/components/admin/infoForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Admin Bilgileri');
}

export default async function Page() {
    const response = await getInfoAdmin();
    const breadcrumb = [{ label: 'Admin Bilgileri' }];

    return (
        <PageContainer >
            {response && <InfoFormAdmin detail={response} breadcrumb={breadcrumb} />}
        </PageContainer>
    );
}
