import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getStaffComplaintsMuni } from '@/app/actions';
import { StaffAttendedComplaintsPaginationBody } from '@/types';
import AttendedList from '@/components/staff/attendedList';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Atanan Şikayetler');
}

export default async function Page({
    params,
    searchParams,
}: {
    params: Promise<{ id?: string }>;
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
        categoryType?: string;
        complaintsStatusType?: string;
        startDate?: string;
        endDate?: string;
    }>;
}) {
    const resolvedParams = await params;

    const municipalityStaffId = Number(resolvedParams.id);
    const resolvedSearchParams = await searchParams;

    const pageNumber = Number(resolvedSearchParams.page) || 1;
    const pageSize = Number(resolvedSearchParams.pageSize) || 20;
    const categoryType = Number(resolvedSearchParams.categoryType);
    const complaintsStatusType = Number(
        resolvedSearchParams.complaintsStatusType
    );
    const startDate = resolvedSearchParams.startDate || '';
    const endDate = resolvedSearchParams.endDate || '';

    const paginationBody: StaffAttendedComplaintsPaginationBody = {
        pageNumber,
        pageSize,
        municipalityStaffId,
        categoryType,
        complaintsStatusType,
        startDate,
        endDate,
    };

    const response = await getStaffComplaintsMuni(paginationBody);

    const breadcrumb = [
        { label: 'Personel Listesi', href: '/municipality/staff/list' },
        { label: 'Atanan Şikayetler' },
    ];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <AttendedList
                    complaints={response.data}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
