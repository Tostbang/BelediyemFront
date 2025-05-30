import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getVenueByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import VenueForm from '@/components/venue/form';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'Mekan Düzenle' : 'Yeni Mekan Ekle'
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
            detail = await getVenueByIdMuni(id);
            if (!detail) {
                errorMessage = `Mekan bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                isNewRecord = true;
                id = null;
            }
        } catch (error) {
            console.log('Mekan detayı alınamadı:', error);
            errorMessage = `Mekan detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            isNewRecord = true;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Mekan Listesi', href: '/municipality/venue' },
        {
            label: isNewRecord ? 'Yeni Mekan Ekle' : 'Mekan Düzenle',
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
                <VenueForm
                    id={id}
                    detail={detail || null}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
