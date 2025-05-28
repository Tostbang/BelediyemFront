import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { AnnouncementPaginationBody } from '@/types';
import { getAnnsMuni } from '@/app/actions/municipality/ann';
import EventList from '@/components/event/list';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Personel Listesi');
}

export default async function Page({
    searchParams,
}: {
    searchParams: {
        page?: string;
        pageSize?: string;
        announcementsType?: string;
        startDate?: string;
        endDate?: string;
    };
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

    const response = await getAnnsMuni(paginationBody);

    const breadcrumb = [{ label: 'Etkinlik / Duyuru Listesi' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            {response && <EventList events={response} />}
        </PageContainer>
    );
}
