import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getComplaintsDepartmentStaff } from '@/app/actions';
import { ComplaintsPaginationBody } from '@/types';
import ComplaintList from '@/components/complaint-request/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

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

    const response = await getComplaintsDepartmentStaff(paginationBody);

    const breadcrumb = [
        { label: 'Şikayet / Talep', href: '/staff/complaint-request' },
        { label: 'Departmana Gelen Şikayet / Talep' },
    ];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <ComplaintList
                complaints={response.data || null}
                breadcrumb={breadcrumb}
                type="staff"
                isDepartment={true}
            />
        </PageContainer>
    );
}
