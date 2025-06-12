import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getFacilitiesMuniAdmin } from '@/app/actions';
import { PaginationBody } from '@/types';
import FacilityList from '@/components/facility/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Tesis Listesi');
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

    const response = await getFacilitiesMuniAdmin(paginationBody);

    const breadcrumb = [{ label: 'Tesis Listesi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <FacilityList
                    facilities={response.data}
                    type="admin-muni"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
