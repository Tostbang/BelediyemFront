import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getComplaintStatusesMuniAdmin } from '@/app/actions';
import { ComplaintsStatusPBody } from '@/types';
import ComplaintStatusList from '@/components/complaint-request/statusesList';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Şikayet / Talep Tüm Durumlar');
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
    }>;
}) {
    const resolvedParams = await params;

    const complaintId = Number(resolvedParams.id);
    const resolvedSearchParams = await searchParams;
    const pageNumber = Number(resolvedSearchParams.page) || 1;
    const pageSize = Number(resolvedSearchParams.pageSize) || 20;

    const paginationBody: ComplaintsStatusPBody = {
        complaintId,
        pageNumber,
        pageSize,
    };

    const response = await getComplaintStatusesMuniAdmin(paginationBody);

    const breadcrumb = [
        {
            label: 'Şikayet / Talep Detay',
            href: `/adminmunicipality/complaint-request/${complaintId}`,
        },
        { label: 'Şikayet / Talep Tüm Durumlar' },
    ];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <ComplaintStatusList
                statuses={response.data || null}
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
