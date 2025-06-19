import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDashboardMuni, getReportsMuni } from '@/app/actions';
import DashboardMuni from '@/components/dashboard';
import { PaginationBody } from '@/types';
import AuthErrorHandler from '@/components/AuthErrorHandler';

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

    const response = await getDashboardMuni();

    const paginationBody: PaginationBody = {
        pageNumber,
        pageSize,
    };
    const reportsData = await getReportsMuni(paginationBody);

    const breadcrumb = [{ label: 'Anasayfa' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <DashboardMuni
                dashboard={response.data || null}
                reports={reportsData.data || null}
                breadcrumb={breadcrumb}
                type="municipality"
            />
        </PageContainer>
    );
}
