import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getSliderByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import SliderForm from '@/components/slider/form';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'Slayt Düzenle' : 'Yeni Slayt Ekle'
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
            detail = await getSliderByIdMuni(id);
            if (!detail) {
                errorMessage = `Slayt bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                isNewRecord = true;
                id = null;
            }
        } catch (error) {
            console.log('Slayt detayı alınamadı:', error);
            errorMessage = `Slayt detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            isNewRecord = true;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Slayt Listesi', href: '/municipality/slider' },
        {
            label: isNewRecord ? 'Yeni Slayt Ekle' : 'Slayt Düzenle',
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
                <SliderForm
                    id={id}
                    detail={detail || null}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
