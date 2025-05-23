import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getFAQsMuni } from '@/app/actions';
import FaqList from '@/components/faq/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Sıkça Sorulan Sorular');
}

export default async function Page() {
    const response = await getFAQsMuni();

    const breadcrumb = [{ label: 'Sıkça Sorulan Sorular' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            <FaqList
                faqs={response?.frequentlyAskedQuestions || []}
                type="municipality"
            />
        </PageContainer>
    );
}
