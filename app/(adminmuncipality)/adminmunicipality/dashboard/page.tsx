import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDashboardMuniAdmin, getReportsMuniAdmin } from '@/app/actions';
import DashboardMuni from '@/components/dashboard';
import { PaginationBody } from '@/types';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Anasayfa');
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{ page?: string; pageSize?: string }>;
}) {
    const params = await searchParams;
    const pageNumber = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;

    const response = await getDashboardMuniAdmin();

    const paginationBody: PaginationBody = {
        pageNumber,
        pageSize,
    };
    const reportsData = await getReportsMuniAdmin(paginationBody);

    const breadcrumb = [{ label: 'Anasayfa' }];

    return (
        <PageContainer>
            {response && (
                <DashboardMuni
                    dashboard={response}
                    reports={reportsData}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
