import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getMunisPWResetRequestAdmin } from '@/app/actions';
import { PaginationBody } from '@/types';
import PWResetList from '@/components/muni/resetPwList';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Belediye Şifre Sıfırlama Talepleri');
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
    const response = await getMunisPWResetRequestAdmin(paginationBody);

    const breadcrumb = [{ label: 'Belediye Şifre Sıfırlama Talepleri' }];

    return (
        <PageContainer>
            {response && (
                <PWResetList
                    requests={response || []}
                    type="admin"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
