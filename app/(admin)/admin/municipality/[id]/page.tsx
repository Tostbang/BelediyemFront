import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getMuniByIdAdmin } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import MuniForm from '@/components/muni/muniForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'Belediye Düzenle / Görüntüle' : 'Yeni Belediye Ekle'
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
            detail = await getMuniByIdAdmin(id);
            if (!detail) {
                errorMessage = `Belediye bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                isNewRecord = true;
                id = null;
            }
        } catch (error) {
            console.log('Belediye detayı alınamadı:', error);
            errorMessage = `Belediye detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            isNewRecord = true;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Belediye Listesi', href: '/admin/municipality/list' },
        {
            label: isNewRecord
                ? 'Yeni Belediye Ekle'
                : 'Belediye Düzenle / Görüntüle',
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
                <MuniForm
                    id={id}
                    detail={detail || null}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
