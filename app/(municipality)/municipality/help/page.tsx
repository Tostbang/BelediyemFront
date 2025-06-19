import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getAdminFAQsMuni } from '@/app/actions';
import FaqList from '@/components/faq/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Yardım Merkezi');
}

export default async function Page() {
    const response = await getAdminFAQsMuni();

    const breadcrumb = [{ label: 'Yardım Merkezi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <FaqList
                faqs={response?.data || null}
                type="municipality"
                showActions={false}
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
