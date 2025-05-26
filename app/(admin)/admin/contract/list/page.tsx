import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getContractsAdmin } from '@/app/actions';
import ContractList from '@/components/contract/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Sözleşmeler');
}

export default async function Page() {
    const response = await getContractsAdmin();

    const breadcrumb = [{ label: 'Sözleşmeler' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            {response && <ContractList contracts={response || []} />}
        </PageContainer>
    );
}
