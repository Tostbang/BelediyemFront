import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getFAQsMuni } from '@/app/actions';
import FaqList from '@/components/faq/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Sıkça Sorulan Sorular');
}

export default async function Page() {
    const response = await getFAQsMuni();

    const breadcrumb = [{ label: 'Sıkça Sorulan Sorular' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <FaqList
                    faqs={response?.data || []}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
