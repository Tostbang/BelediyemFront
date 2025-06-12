import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import AlertMessage from '@/components/ui/AlertMessage';
import EventForm from '@/components/event/form';
import { getAnnByIdMuniAdmin } from '@/app/actions';
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
        isEditing
            ? 'Etkinlik - Duyuru Düzenle'
            : 'Yeni Etkinlik / Duyuru Oluştur'
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
            response = await getAnnByIdMuniAdmin(id);
            if (response.success) {
                detail = response.data;
                if (
                    detail?.code === 'NOT_FOUND' ||
                    detail?.code === '400' ||
                    detail?.code === '404'
                ) {
                    errorMessage = `Etkinlik bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
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
            console.log('Etkinlik detayı alınamadı:', error);
            errorMessage = `Etkinlik detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        {
            label: 'Etkinlik / Duyuru Listesi',
            href: '/adminmunicipality/event',
        },
        {
            label: isNewRecord
                ? 'Yeni Etkinlik / Duyuru Oluştur'
                : 'Etkinlik - Duyuru Düzenle',
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
                <EventForm
                    id={id}
                    detail={detail || null}
                    breadcrumb={breadcrumb}
                    type="admin-muni"
                />
            )}
        </PageContainer>
    );
}
