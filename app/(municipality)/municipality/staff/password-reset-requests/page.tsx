import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getStaffPWResetRequestMuni } from '@/app/actions';
import { PaginationBody } from '@/types';
import PWResetList from '@/components/muni/resetPwList';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Personel Şifre Sıfırlama Talepleri');
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
    const response = await getStaffPWResetRequestMuni(paginationBody);

    const breadcrumb = [
        { label: 'Personel Listesi', href: '/municipality/staff' },
        { label: 'Personel Şifre Sıfırlama Talepleri' },
    ];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <PWResetList
                requests={response.data || null}
                type="municipality"
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
