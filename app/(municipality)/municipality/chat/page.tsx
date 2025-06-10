import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getChatHistyory, getMessages } from '@/app/actions';
import { ComplaintsPaginationBody } from '@/types';
import ChatList from '@/components/chat/list';
import AuthErrorHandler from '@/components/AuthErrorHandler';

export const dynamic = 'force-dynamic';

export async function generateMetadata() {
    return generatePageMetadata('Sohbetler');
}

export default async function Page({
    searchParams,
}: {
    searchParams: Promise<{
        page?: string;
        pageSize?: string;
        chatId?: string;
    }>;
}) {
    const params = await searchParams;
    const pageNumber = Number(params.page) || 1;
    const pageSize = Number(params.pageSize) || 20;
    const chatId = params.chatId || '';

    const paginationBody: ComplaintsPaginationBody = {
        pageNumber,
        pageSize,
    };

    const response = await getChatHistyory(paginationBody);

    const messagesResponse = await getMessages(chatId?.toString() || '');

    const breadcrumb = [{ label: 'Sohbetler' }];

    return (
        <PageContainer>
            <AuthErrorHandler
                error={!response?.success ? response : undefined}
            />
            {response?.success && response.data && (
                <ChatList
                    chats={response.data}
                    messages={messagesResponse?.data?.messageGroups || []}
                    breadcrumb={breadcrumb}
                    chatId={chatId}
                />
            )}
        </PageContainer>
    );
}
