import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import ChangePasswordForm from '@/components/changePassword/form';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Şifre Değiştirme');
}

export default async function Page() {
    const breadcrumb = [{ label: 'Şifre Değiştirme' }];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            <ChangePasswordForm type="municipality" />
        </PageContainer>
    );
}
