import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getVenuesMuni } from '@/app/actions';
import { PaginationBody } from '@/types';
import VenueList from '@/components/venue/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Mekan İçerikleri');
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

    const response = await getVenuesMuni(paginationBody);

    const breadcrumb = [{ label: 'Mekan İçerikleri' }];

    return (
        <PageContainer>
            {response && (
                <VenueList
                    venues={response || []}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
