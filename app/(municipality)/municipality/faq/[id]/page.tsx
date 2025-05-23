import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getFAQByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import FaqForm from '@/components/faq/form';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'SSS Düzenle / Görüntüle' : 'Yeni SSS Ekle'
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
            detail = await getFAQByIdMuni(id);
            if (!detail) {
                errorMessage = `SSS bulunamadı: #${id} ID'li blog yazısı mevcut değil veya erişim yetkiniz yok.`;
                isNewRecord = true;
                id = null;
            }
        } catch (error) {
            console.log('SSS detayı alınamadı:', error);
            errorMessage = `SSS detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            isNewRecord = true;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'SSS Listesi', href: '/municipality/faq' },
        { label: isNewRecord ? 'Yeni SSS Ekle' : 'SSS Düzenle / Görüntüle' },
    ];

    return (
        <PageContainer breadcrumb={breadcrumb}>
            {errorMessage ? (
                <AlertMessage
                    message={errorMessage}
                    type="error"
                    title="Hata"
                />
            ) : (
                <FaqForm id={id} detail={detail || null} type="municipality" />
            )}
        </PageContainer>
    );
}
