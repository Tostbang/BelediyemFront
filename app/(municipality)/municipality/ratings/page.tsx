import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getRatingsMuni } from '@/app/actions';
import { PaginationBody } from '@/types';
import RatingList from '@/components/ratings/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Değerlendirme');
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
    const response = await getRatingsMuni(paginationBody);

    const breadcrumb = [{ label: 'Değerlendirme' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <RatingList
                ratings={response.data || null}
                breadcrumb={breadcrumb}
                type="municipality"
            />
        </PageContainer>
    );
}
