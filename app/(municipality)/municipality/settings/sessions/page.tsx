import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDevicesMun } from '@/app/actions';
import DevicesMuni from '@/components/muni/devices';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Cihaz Oturumları');
}

export default async function Page() {
    const breadcrumb = [{ label: 'Cihaz Oturumları' }];
    const response = await getDevicesMun();

    return (
        <PageContainer breadcrumb={breadcrumb}>
            <DevicesMuni devices={response?.devices || []} />
        </PageContainer>
    );
}
