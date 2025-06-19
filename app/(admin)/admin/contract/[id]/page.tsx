import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getContractByIDAdmin } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import ContractForm from '@/components/contract/form';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Sözleşme Düzenle / Görüntüle');
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

    if (isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
    } else {
        errorMessage = "Geçersiz sözleşme ID'si.";
    }

    let detail = null;
    if (id) {
        try {
            response = await getContractByIDAdmin(id);
            if (response.success) {
                detail = response.data;
                if (
                    detail?.code === 'NOT_FOUND' ||
                    detail?.code === '400' ||
                    detail?.code === '404'
                ) {
                    errorMessage = `Sözleşme bulunamadı: #${id} ID'li kayıt mevcut değil veya erişim yetkiniz yok.`;
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
            console.log('Sözleşme detayı alınamadı:', error);
            errorMessage = `Sözleşme detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Sözleşme Listesi', href: '/admin/contract' },
        { label: 'Sözleşme Düzenle / Görüntüle' },
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
                <ContractForm
                    id={id}
                    detail={detail || null}
                    breadcrumb={breadcrumb}
                />
            )}
        </PageContainer>
    );
}
