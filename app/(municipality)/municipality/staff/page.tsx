import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getStaffsMuni } from '@/app/actions';
import { StaffPaginationBody } from '@/types';
import StaffList from '@/components/staff/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Personel Listesi');
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
        searchText?: string;
        municipalStaffType?: string;
    }>;
}) {
    const params = await searchParams;
    const pageNumber = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;
    const searchText = params.searchText || '';
    const municipalStaffType = Number(params.municipalStaffType) || 0;

    const paginationBody: StaffPaginationBody = {
        pageNumber,
        pageSize,
        searchText,
        municipalStaffType,
    };

    const response = await getStaffsMuni(paginationBody);

    const breadcrumb = [{ label: 'Personel Listesi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <StaffList
                staffList={response.data || null}
                breadcrumb={breadcrumb}
                type="municipality"
            />
        </PageContainer>
    );
}
