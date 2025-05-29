import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import AlertMessage from '@/components/ui/AlertMessage';
import { getAnnByIdMuni } from '@/app/actions/municipality/ann';
import AnnDetail from '@/components/event/detail';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'Etkinlik - Duyuru Detay' : 'Yeni Etkinlik / Duyuru Oluştur'
    );
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;

    let id = null;
    let isNewRecord = true;
    let errorMessage = null;

    if (resolvedParams.id !== 'new' && isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
        isNewRecord = false;
    }

    let detail = null;
    if (id) {
        try {
            detail = await getAnnByIdMuni(id);
            if (!detail) {
                errorMessage = `Etkinlik / Duyuru bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                isNewRecord = true;
                id = null;
            }
        } catch (error) {
            console.log('Etkinlik / Duyuru detayı alınamadı:', error);
            errorMessage = `Etkinlik / Duyuru detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            isNewRecord = true;
            id = null;
        }
    }

    const breadcrumb = [
        {
            label: 'Etkinlik / Duyuru Listesi',
            href: '/municipality/event',
        },
        {
            label: isNewRecord
                ? 'Yeni Etkinlik / Duyuru Oluştur'
                : 'Etkinlik - Duyuru Detay',
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
                <AnnDetail
                    id={id}
                    detail={detail || null}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
