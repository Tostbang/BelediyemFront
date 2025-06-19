import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getDevicesStaff } from '@/app/actions';
import DevicesList from '@/components/devices';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Cihaz Oturumları');
}

export default async function Page() {
    const breadcrumb = [{ label: 'Cihaz Oturumları' }];
    const response = await getDevicesStaff();

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            <DevicesList
                devices={response?.data || null}
                type="staff"
                breadcrumb={breadcrumb}
            />
        </PageContainer>
    );
}
