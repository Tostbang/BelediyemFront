import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getCitizenMuni } from '@/app/actions';
import { PaginationBody } from '@/types';
import CitizenList from '@/components/citizen/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Atanan Şikayetler');
}

export default async function Page({
    searchParams,
}: {
    searchParams: {
        page?: string;
        pageSize?: string;
        searchText?: string;
    };
}) {
    const resolvedSearchParams = await searchParams;

    const pageNumber = Number(resolvedSearchParams.page) || 1;
    const pageSize = Number(resolvedSearchParams.pageSize) || 20;
    const searchText = resolvedSearchParams.searchText || '';

    const paginationBody: PaginationBody = {
        pageNumber,
        pageSize,
        searchText,
    };

    const response = await getCitizenMuni(paginationBody);

    const breadcrumb = [{ label: 'Vatandaş Listesi' }];

    return (
        <PageContainer>
            {response && (
                <CitizenList users={response} breadcrumb={breadcrumb} />
            )}
        </PageContainer>
    );
}
