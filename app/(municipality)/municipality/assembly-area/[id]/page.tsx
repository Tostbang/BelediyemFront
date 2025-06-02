import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import AlertMessage from '@/components/ui/AlertMessage';
import AssemblyForm from '@/components/assembly-area/form';
import { getAssemblyByIdMuni } from '@/app/actions';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'Toplanama Alanı Düzenle' : 'Yeni Toplanama Alanı Ekle'
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
            detail = await getAssemblyByIdMuni(id);
            if (!detail) {
                errorMessage = `Toplanama alanı bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                isNewRecord = true;
                id = null;
            }
        } catch (error) {
            console.log('Toplanama alanı detayı alınamadı:', error);
            errorMessage = `Toplanama alanı detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            isNewRecord = true;
            id = null;
        }
    }

    const breadcrumb = [
        {
            label: 'Toplanama Alanı Listesi',
            href: '/municipality/assembly-area',
        },
        {
            label: isNewRecord
                ? 'Yeni Toplanama Alanı Ekle'
                : 'Toplanama Alanı Düzenle',
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
                <AssemblyForm
                    id={id}
                    detail={detail || null}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
