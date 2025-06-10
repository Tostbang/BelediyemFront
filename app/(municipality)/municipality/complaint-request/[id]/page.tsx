import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getComplaintByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import ComplaintDetail from '@/components/complaint-request/detail';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Şikayet Talep Detayı');
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;

    let id = null;
    let errorMessage = null;
    let response = null;

    if (resolvedParams.id !== 'new' && isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
    }

    let detail = null;
    if (id) {
        try {
            response = await getComplaintByIdMuni(id);
            if (response.success) {
                detail = response.data;
                if (
                    detail?.code === 'NOT_FOUND' ||
                    detail?.code === '400' ||
                    detail?.code === '404'
                ) {
                    errorMessage = `Şikayet / Talep bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                }
            } else {
                id = null;
                if (response.status === 'UNAUTHORIZED') {
                    return (
                        <AuthErrorHandler
                            error={!response?.success ? response : undefined}
                        />
                    );
                }
            }
        } catch (error) {
            console.log('Şikayet / Talep detayı alınamadı:', error);
            errorMessage = `Şikayet / Talep detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        {
            label: 'Şikayet / Talep Listesi',
            href: '/municipality/complaint-request',
        },
        {
            label: 'Şikayet / Talep Detayı',
        },
    ];

    return (
        <PageContainer>
            {errorMessage ? (
                <AlertMessage
                    message={errorMessage}
                    type="error"
                    title="Hata"
                />
            ) : (
                <ComplaintDetail
                    id={id}
                    detail={detail || null}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
