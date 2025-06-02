import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getSlidersMuni } from '@/app/actions';
import SlaytList from '@/components/slider/list';
import { PaginationBody } from '@/types';

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
            {response && (
                <SlaytList
                    sliders={response || []}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
