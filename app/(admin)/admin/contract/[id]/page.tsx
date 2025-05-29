import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { isPositiveNumber } from '@/utils';
import { getContractByIDAdmin } from '@/app/actions';
import AlertMessage from '@/components/ui/AlertMessage';
import ContractForm from '@/components/contract/form';

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

    if (isPositiveNumber(resolvedParams.id)) {
        id = resolvedParams.id;
    } else {
        errorMessage = "Geçersiz sözleşme ID'si.";
    }

    let detail = null;
    if (id) {
        try {
            detail = await getContractByIDAdmin(id);
            if (!detail) {
                errorMessage = `Sözleşme bulunamadı: #${id} ID'li sözleşme mevcut değil veya erişim yetkiniz yok.`;
                id = null;
            }
        } catch (error) {
            console.log('Sözleşme detayı alınamadı:', error);
            errorMessage = `Sözleşme detayı alınamadı: ${error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu'}`;
            id = null;
        }
    }

    const breadcrumb = [
        { label: 'Sözleşme Listesi', href: '/admin/contract/list' },
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
