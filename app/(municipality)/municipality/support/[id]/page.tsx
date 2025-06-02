import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getSupporByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import SupportDetail from '@/components/support/detail';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Destek Talep Detayı');
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;

    let id = null;
    let errorMessage = null;

    if (resolvedParams.id !== 'new' && isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
    }

    let detail = null;
    if (id) {
        try {
            detail = await getSupporByIdMuni(id);
            if (!detail) {
                errorMessage = `Destek Talebi bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                id = null;
            }
        } catch (error) {
            console.log('Destek Talebi detayı alınamadı:', error);
            errorMessage = `Destek Talebi detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Destek Talebi Listesi', href: '/municipality/support' },
        {
            label: 'Destek Talep Detayı',
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
                <SupportDetail
                    id={id}
                    detail={detail || null}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
