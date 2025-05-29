import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getStaffByIdMuni } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import StaffForm from '@/components/staff/staffForm';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = await params;
    const isEditing = resolvedParams.id !== 'new';
    return generatePageMetadata(
        isEditing ? 'Personel Düzenle / Görüntüle' : 'Yeni Personel Ekle'
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
            detail = await getStaffByIdMuni(id);
            if (!detail) {
                errorMessage = `Personel bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
                isNewRecord = true;
                id = null;
            }
        } catch (error) {
            console.log('Personel detayı alınamadı:', error);
            errorMessage = `Personel detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            isNewRecord = true;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Personel Listesi', href: '/municipality/staff/list' },
        {
            label: isNewRecord
                ? 'Yeni Personel Ekle'
                : 'Personel Düzenle / Görüntüle',
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
                <StaffForm
                    id={id}
                    detail={detail || null}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
