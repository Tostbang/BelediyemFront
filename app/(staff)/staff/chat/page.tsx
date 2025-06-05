import React from 'react';
import PageContainer from '@/components/pageContainer';
import { generatePageMetadata } from '@/lib/metadata';
import { getChatHistyory, getMessages } from '@/app/actions';
import { ComplaintsPaginationBody } from '@/types';
import ChatList from '@/components/chat/list';

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
            {response && (
                <ChatList
                    chats={response}
                    messages={messagesResponse?.messageGroups || []}
                    breadcrumb={breadcrumb}
                    chatId={chatId}
                />
            )}
        </PageContainer>
    );
}
