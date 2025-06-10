import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { PaginationBody } from '@/types';
import { getAssembliesMuni } from '@/app/actions';
import AssemblyList from '@/components/assembly-area/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Toplanma Alanı Listesi');
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

    const response = await getAssembliesMuni(paginationBody);

    const breadcrumb = [{ label: 'Toplanma Alanı Listesi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <AssemblyList
                    assemblies={response.data}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
