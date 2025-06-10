import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getFacilityByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import FacilityForm from '@/components/facility/form';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'Tesis Düzenle' : 'Yeni Tesis Ekle'
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
    let response = null;

    if (resolvedParams.id !== 'new' && isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
        isNewRecord = false;
    }

    let detail = null;
    if (id) {
        try {
            response = await getFacilityByIdMuni(id);
            if (response.success) {
                detail = response.data;
                if (
                    detail?.code === 'NOT_FOUND' ||
                    detail?.code === '400' ||
                    detail?.code === '404'
                ) {
                    errorMessage = `Tesis bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
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
            console.log('Tesis detayı alınamadı:', error);
            errorMessage = `Tesis detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Tesis Listesi', href: '/municipality/facility' },
        {
            label: isNewRecord ? 'Yeni Tesis Ekle' : 'Tesis Düzenle',
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
                <FacilityForm
                    id={id}
                    detail={detail || null}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
