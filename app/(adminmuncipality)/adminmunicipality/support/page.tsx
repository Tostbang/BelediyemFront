import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getSupportsMuniAdmin } from '@/app/actions';
import { PaginationBody } from '@/types';
import SupportList from '@/components/support/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Destek Listesi');
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
        searchText?: string;
    }>;
}) {
    const params = await searchParams;
    const pageNumber = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;
    const searchText = params.searchText || '';

    const paginationBody: PaginationBody = {
        pageNumber,
        pageSize,
        searchText,
    };

    const response = await getSupportsMuniAdmin(paginationBody);

    const breadcrumb = [{ label: 'Destek Listesi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <SupportList
                supports={response.data || null}
                type="admin-muni"
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
