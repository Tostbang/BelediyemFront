import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { PaginationBody } from '@/types';
import { getAssembliesMuni } from '@/app/actions';
import AssemblyList from '@/components/assembly-area/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Toplanma İçerikleri');
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

    const breadcrumb = [{ label: 'Toplanma İçerikleri' }];

    return (
        <PageContainer>
            {response && (
                <AssemblyList
                    assemblies={response || []}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
