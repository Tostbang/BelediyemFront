import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { PaginationBody } from '@/types';
import { getAssembliesMuniAdmin } from '@/app/actions';
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

    const response = await getAssembliesMuniAdmin(paginationBody);

    const breadcrumb = [{ label: 'Toplanma Alanı Listesi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <AssemblyList
                assemblies={response.data || null}
                type="admin-muni"
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
