import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getContractsAdmin } from '@/app/actions';
import ContractList from '@/components/contract/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Sözleşmeler');
}

export default async function Page() {
    const response = await getContractsAdmin();

    const breadcrumb = [{ label: 'Sözleşmeler' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <ContractList
                contracts={response.data || null}
                breadcrumb={breadcrumb}
                type="admin"
            />
        </PageContainer>
    );
}
