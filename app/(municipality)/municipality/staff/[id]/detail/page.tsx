import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getStaffByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import StaffDetail from '@/components/staff/detail';
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
        isEditing ? 'Personel Detay' : 'Yeni Personel Ekle'
    );
}

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;

    let id = null;
    let errorMessage = null;
    let response = null;

    if (resolvedParams.id !== 'new' && isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
    }

    let detail = null;
    if (id) {
        try {
            response = await getStaffByIdMuni(id);
            if (response.success) {
                detail = response.data;
                if (
                    detail?.code === 'NOT_FOUND' ||
                    detail?.code === '400' ||
                    detail?.code === '404'
                ) {
                    errorMessage = `Personel bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
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
            console.log('Personel detayı alınamadı:', error);
            errorMessage = `Personel detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Personel Listesi', href: '/municipality/staff' },
        { label: 'Personel Detay' },
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
                <StaffDetail
                    detail={detail || null}
                    id={id}
                    type="municipality"
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
