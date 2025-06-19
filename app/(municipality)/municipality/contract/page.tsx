import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getContractsMuni } from '@/app/actions';
import AuthErrorHandler from '@/components/AuthErrorHandler';
import ContractListCollapse from '@/components/contract/collapse';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Sözleşmeler');
}

export default async function Page() {
    const response = await getContractsMuni();

    const breadcrumb = [{ label: 'Sözleşmeler' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <ContractListCollapse
                contracts={response.data || null}
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
