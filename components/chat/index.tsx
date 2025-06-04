import React, { useState, useEffect, useRef } from 'react';
import OutgoingMessage from './outgoingMessage';
import IncomingMessage from './incomingMessage';
import { Spin } from 'antd';
import { AiOutlineLoading } from 'react-icons/ai';
import { handleDateLong, today, yesterday } from '@/utils';
import { getClientCookie, safelyParseJSON } from '@/utils/auth';
import { Message, User } from '@/types';
import { sendMessage } from '@/app/actions';

// Define a set of 4 distinct colors for different senders
const SENDER_COLORS = ['#e0e0e0', '#E5CF54', '#9463C2', '#E94F87'];

// Updated interface to match the new messageGroups structure
interface ChatAreaProps {
    chatId: string;
    chatLoading: boolean;
    chatSendLoading: boolean;
    messageGroups: {
        date: string;
        messages: Message[];
    }[];
}

export default function ChatArea({
    chatId,
    chatLoading,
    chatSendLoading,
    messageGroups,
}: ChatAreaProps) {
    const [message, setMessage] = useState<string>('');
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [senderColorMap, setSenderColorMap] = useState<
        Record<number, string>
    >({});

    useEffect(() => {
        const userData = getClientCookie('user');
        const parsedUser = safelyParseJSON<User>(userData);
        setUserDetails(parsedUser);

        // Initialize color map for senders when messages load
        if (messageGroups && messageGroups.length > 0) {
            const uniqueSenderIds = new Set<number>();
            const colorMap: Record<number, string> = {};

            messageGroups.forEach((group) => {
                group.messages.forEach((msg) => {
                    if (
                        msg.senderId !== parsedUser?.userId &&
                        !uniqueSenderIds.has(msg.senderId)
                    ) {
                        uniqueSenderIds.add(msg.senderId);
                    }
                });
            });

            // Assign colors to unique sender IDs
            Array.from(uniqueSenderIds).forEach((senderId, index) => {
                colorMap[senderId] =
                    SENDER_COLORS[index % SENDER_COLORS.length];
            });

            setSenderColorMap(colorMap);
        }
    }, [messageGroups]);

    const handlSendMessage = (messageText: string) => {
        const formData = new FormData();
        formData.append('complaintId', chatId);
        formData.append('content', messageText);
        sendMessage(formData);
        setMessage('');
    };

    const scrollToBottom = () => {
        if (scrollbarRef.current) {
            const scrollElement = scrollbarRef.current;
            scrollElement.style.scrollBehavior = 'smooth';
            scrollElement.scrollTop = scrollElement.scrollHeight;
        }
    };

    const handleScroll = () => {
        if (scrollbarRef.current) {
            const scrollElement = scrollbarRef.current;
            const isNearBottom =
                scrollElement.scrollHeight - scrollElement.scrollTop <=
                scrollElement.clientHeight + 10;
            setShowScrollButton(!isNearBottom);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageGroups]);

    return (
        <div className="flex flex-col gap-2 h-full">
            <div className="relative border border-gray-200 rounded p-4 flex-grow">
                <div
                    ref={scrollbarRef}
                    onScroll={handleScroll}
                    className="overflow-y-auto pr-2"
                    style={{
                        height: '70vh' /* Increased height to fill available space */,
                        scrollBehavior: 'smooth',
                    }}>
                    {(!messageGroups || messageGroups.length === 0) &&
                        !chatLoading && (
                            <div className="flex items-center justify-center h-full text-gray-500 gap-2">
                                Henüz mesaj yok
                            </div>
                        )}
                    {chatLoading ? (
                        <div className="flex justify-center">
                            <Spin indicator={<AiOutlineLoading />} />
                        </div>
                    ) : (
                        // Updated mapping logic for the new messageGroups structure
                        messageGroups &&
                        messageGroups.map((group, groupIndex) => (
                            <div key={groupIndex}>
                                <div className="flex justify-center gap-1.5">
                                    <div className="py-1 px-2 rounded-lg text-sm font-medium w-1/4 mb-4 flex justify-center">
                                        {group.date === today
                                            ? 'Bugün'
                                            : group.date === yesterday
                                              ? 'Dün'
                                              : handleDateLong(group.date)}
                                    </div>
                                </div>
                                {group.messages.map(
                                    (msg: Message, index: number) =>
                                        msg.senderId == userDetails?.userId ? (
                                            <OutgoingMessage
                                                key={index}
                                                message={msg}
                                            />
                                        ) : (
                                            <IncomingMessage
                                                key={index}
                                                message={msg}
                                                messageColor={
                                                    senderColorMap[
                                                        msg.senderId
                                                    ] || '#e0e0e0'
                                                }
                                            />
                                        )
                                )}
                            </div>
                        ))
                    )}
                </div>

                {showScrollButton && (
                    <div
                        onClick={scrollToBottom}
                        className="absolute bottom-4 right-4 z-10 w-9 h-9 rounded-full bg-white shadow-md flex justify-center items-center cursor-pointer">
                        <svg
                            className="w-5 h-5 text-black"
                            fill="none"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                        </svg>
                    </div>
                )}
            </div>

            <div className="flex gap-2 items-center">
                <input
                    className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyUp={(e) => {
                        if (e.key === 'Enter' && message.trim() !== '')
                            handlSendMessage(message.trim());
                    }}
                    placeholder="Mesajınızı yazın..."
                />
                <button
                    className={`px-6 py-2 rounded font-medium whitespace-nowrap ${
                        chatSendLoading || message.trim() === ''
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                    onClick={() => handlSendMessage(message.trim())}
                    disabled={chatSendLoading || message.trim() === ''}>
                    {chatSendLoading ? (
                        <div className="flex items-center">
                            <div className="w-4 h-4 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                            Gönderiliyor...
                        </div>
                    ) : (
                        'Gönder'
                    )}
                </button>
            </div>
        </div>
    );
}
