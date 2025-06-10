import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getFAQByIdMuniAdmin } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import FaqForm from '@/components/faq/form';
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
    let response = null;

    if (resolvedParams.id !== 'new' && isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
        isNewRecord = false;
    }

    let detail = null;
    if (id) {
        try {
            response = await getFAQByIdMuniAdmin(id);
            if (response.success) {
                detail = response.data;
                if (
                    detail?.code === 'NOT_FOUND' ||
                    detail?.code === '400' ||
                    detail?.code === '404'
                ) {
                    errorMessage = `SSS bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
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
            console.log('SSS detayı alınamadı:', error);
            errorMessage = `SSS detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'SSS Listesi', href: '/adminmunicipality/faq' },
        { label: isNewRecord ? 'Yeni SSS Ekle' : 'SSS Düzenle / Görüntüle' },
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
                <FaqForm
                    id={id}
                    detail={detail || null}
                    type="admin-muni"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
