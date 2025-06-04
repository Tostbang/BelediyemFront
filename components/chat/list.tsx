'use client';
import React, { useState } from 'react';
import { BreadcrumbItem, ChatHistoryResponse, MessageGroup } from '@/types';
import Breadcrumb from '../common/breadCrumb';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { formatDate } from '@/utils';
import { Pagination, Button } from 'antd';
import { usePagination } from '@/hooks/usePagination';
import ChatArea from '.';
import Modal from '../common/modal';

export default function ChatList({
    chats,
    messages,
    chatId,
    breadcrumb,
}: {
    chats: ChatHistoryResponse;
    messages: MessageGroup[];
    chatId?: string;
    breadcrumb: BreadcrumbItem[];
}) {
    const { pageNumber, handlePageChange } = usePagination();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentChatId = searchParams.get('chatId');

    const handleChatClick = (chatId: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('chatId', chatId.toString());
        router.push(`${pathname}?${params.toString()}`);
        setIsModalOpen(false); // Close modal after selection on mobile
    };

    const getStatusColor = (date: string) => {
        const daysSinceLastMessage = Math.floor(
            (Date.now() - new Date(date).getTime()) / (1000 * 60 * 60 * 24)
        );
        if (daysSinceLastMessage < 1) return 'bg-green-500';
        if (daysSinceLastMessage < 3) return 'bg-yellow-500';
        return 'bg-red-500';
    };

    // Chat list content that will be reused in both desktop view and modal
    const ChatListContent = () => (
        <>
            <div className="p-3 bg-gray-50 border-b">
                <h3 className="text-md font-medium text-gray-700">
                    Tüm Şikayetler ({chats.totalCount})
                </h3>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: '70vh' }}>
                {chats.complaintWithLastMessages.map((chat) => (
                    <div
                        key={chat.complaintId}
                        onClick={() => handleChatClick(chat.complaintId)}
                        className={`border-l-4 ${
                            currentChatId === chat.complaintId.toString()
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-transparent hover:border-gray-300'
                        } p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors`}>
                        {/* Status indicator and title */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div
                                    className={`w-2 h-2 rounded-full ${getStatusColor(chat.lastMessageDate)}`}></div>
                                <h3 className="font-medium text-gray-800 truncate max-w-xs">
                                    {chat.complaintTitle}
                                </h3>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                                {formatDate(chat.complaintCreatedDate)}
                            </span>
                        </div>

                        {/* Complaint Owner */}
                        <div className="text-xs text-gray-500 mt-1">
                            <span className="font-medium">Şikayet Sahibi:</span>{' '}
                            {chat.complaintOwnerName}
                        </div>

                        {/* Last Message Preview */}
                        <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                            {chat.lastMessageContent}
                        </p>

                        {/* Last Message Info */}
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <div>
                                <span className="font-medium">
                                    {chat.lastMessageSenderName}
                                </span>
                            </div>
                            <div>{formatDate(chat.lastMessageDate)}</div>
                        </div>
                    </div>
                ))}

                {chats.complaintWithLastMessages.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        Henüz şikayet bulunmuyor.
                    </div>
                )}
            </div>

            {/* Pagination */}
            {chats.totalCount > 1 && (
                <div className="flex justify-center p-4 border-t">
                    <Pagination
                        current={pageNumber}
                        total={chats.totalCount}
                        pageSize={20}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                        showQuickJumper={false}
                        size="small"
                    />
                </div>
            )}
        </>
    );

    return (
        <>
            <Breadcrumb breadcrumb={breadcrumb} />
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 bg-white rounded-lg p-4 shadow-sm">
                <h2 className="text-xl font-semibold">Şikayetler</h2>

                {/* Mobile button to show chat list in modal */}
                <div className="lg:hidden w-full">
                    <Button
                        type="primary"
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-blue-500 hover:bg-blue-600">
                        Şikayet Listesini Göster
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4">
                {/* Chat list - hidden on mobile, visible on desktop */}
                <div className="hidden lg:block w-full lg:w-1/3 bg-white rounded-lg shadow-sm overflow-hidden">
                    <ChatListContent />
                </div>

                {/* Chat Messages Panel */}
                <div className="w-full lg:w-2/3 bg-white rounded-lg shadow-sm">
                    {currentChatId ? (
                        <ChatArea
                            chatId={chatId || ''}
                            messageGroups={messages || []}
                        />
                    ) : (
                        <div className="flex items-center justify-center h-64 text-gray-500">
                            <div className="text-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-12 w-12 mx-auto text-gray-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                    />
                                </svg>
                                <p className="mt-2">
                                    Görüntülemek için bir şikayet seçin
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal for mobile chat list */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="bg-white rounded-lg overflow-hidden">
                    <ChatListContent />
                </div>
            </Modal>
        </>
    );
}
