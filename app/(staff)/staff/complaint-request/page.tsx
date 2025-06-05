import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getComplaintsStaff } from '@/app/actions';
import { ComplaintsPaginationBody } from '@/types';
import ComplaintList from '@/components/complaint-request/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Şikayet / Talep');
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
        startDate?: string;
        endDate?: string;
        categoryType?: string;
        complaintsStatusType?: string;
    }>;
}) {
    const params = await searchParams;
    const pageNumber = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;
    const categoryType = Number(params.categoryType);
    const complaintsStatusType = Number(params.complaintsStatusType);
    const startDate = params.startDate || '';
    const endDate = params.endDate || '';

    const paginationBody: ComplaintsPaginationBody = {
        pageNumber,
        pageSize,
        categoryType,
        complaintsStatusType,
        startDate,
        endDate,
    };

    const response = await getComplaintsStaff(paginationBody);

    const breadcrumb = [{ label: 'Şikayet / Talep' }];

    return (
        <PageContainer>
            {response && (
                <ComplaintList
                    complaints={response || []}
                    breadcrumb={breadcrumb}
                    type='staff'
                />
            )}
        </PageContainer>
    );
}
