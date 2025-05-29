import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDevicesMuni } from '@/app/actions';
import DevicesList from '@/components/devices';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Cihaz Oturumları');
}

export default async function Page() {
    const breadcrumb = [{ label: 'Cihaz Oturumları' }];
    const response = await getDevicesMuni();

    return (
        <PageContainer>
            <DevicesList
                devices={response?.devices || []}
                type="municipality"
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
