import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { AnnouncementPaginationBody } from '@/types';
import EventList from '@/components/event/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';
import { getAnnsMuniAdmin } from '@/app/actions';

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
        announcementsType?: string;
        startDate?: string;
        endDate?: string;
    }>;
}) {
    const params = await searchParams;
    const pageNumber = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;
    const announcementsType = Number(params.announcementsType);
    const startDate = params.startDate || '';
    const endDate = params.endDate || '';

    const paginationBody: AnnouncementPaginationBody = {
        pageNumber,
        pageSize,
        announcementsType,
        startDate,
        endDate,
    };

    const response = await getAnnsMuniAdmin(paginationBody);

    const breadcrumb = [{ label: 'Etkinlik / Duyuru Listesi' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <EventList
                events={response.data || null}
                breadcrumb={breadcrumb}
                type="admin-muni"
            />
        </PageContainer>
    );
}
