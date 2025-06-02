import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getFacilitiesMuni } from '@/app/actions';
import { PaginationBody } from '@/types';
import FacilityList from '@/components/facility/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Tesis İçerikleri');
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

    const response = await getFacilitiesMuni(paginationBody);

    const breadcrumb = [{ label: 'Tesis İçerikleri' }];

    return (
        <PageContainer>
            {response && (
                <FacilityList
                    facilities={response || []}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
