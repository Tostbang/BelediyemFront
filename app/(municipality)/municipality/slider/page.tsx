import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getSlidersMuni } from '@/app/actions';
import SlaytList from '@/components/slider/list';
import { PaginationBody } from '@/types';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Slayt Listesi');
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
    const params = await searchParams;
    const pageNumber = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;

    const paginationBody: PaginationBody = {
        pageNumber,
        pageSize,
    };

    const response = await getSlidersMuni(paginationBody);

    const breadcrumb = [{ label: 'Slayt Listesi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <SlaytList
                    sliders={response.data}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
