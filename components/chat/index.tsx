import React, { useState, useEffect, useRef, useActionState } from 'react';
import OutgoingMessage from './outgoingMessage';
import IncomingMessage from './incomingMessage';
import { handleDateLong, today, yesterday } from '@/utils';
import { getClientCookie, safelyParseJSON } from '@/utils/auth';
import { Message, User } from '@/types';
import { sendMessage } from '@/app/actions';
import SubmitButton from '../common/submitButton';
import { useNotificationHandler } from '@/hooks/useNotificationHandler';
import { useRouter } from 'next/navigation';
import { SendIcon } from '../icons';

// Define a set of 4 distinct colors for different senders
const SENDER_COLORS = ['#e0e0e0', '#E5CF54', '#9463C2', '#E94F87'];

// Updated interface to match the new messageGroups structure
interface ChatAreaProps {
    chatId: string;
    messageGroups: {
        date: string;
        messages: Message[];
    }[];
}

export default function ChatArea({ chatId, messageGroups }: ChatAreaProps) {
    const [showScrollButton, setShowScrollButton] = useState<boolean>(false);
    const scrollbarRef = useRef<HTMLDivElement>(null);
    const { handleSuccess, handleError } = useNotificationHandler();
    const [userDetails, setUserDetails] = useState<User | null>(null);
    const [senderColorMap, setSenderColorMap] = useState<
        Record<number, string>
    >({});
    const router = useRouter();

    const initialState = {
        content: '',
    };

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

    const clientAction = async (_prevState: unknown, formData: FormData) => {
        if (chatId) {
            formData.append('id', chatId);
        }

        const result = await sendMessage(formData);

        if (result.success) {
            handleSuccess(result.message);
            router.refresh();
        } else {
            handleError(result);
        }

        return {
            ...result,
            content: formData.get('content') as string,
        };
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

    const [, formAction] = useActionState(clientAction, initialState);

    return (
        <div className="flex flex-col h-full">
            <div className="relative border border-gray-200 rounded p-4 flex-grow">
                <div
                    ref={scrollbarRef}
                    onScroll={handleScroll}
                    className="overflow-y-auto pr-2"
                    style={{
                        height: '70vh' /* Increased height to fill available space */,
                        scrollBehavior: 'smooth',
                    }}>
                    {(!messageGroups || messageGroups.length === 0) && (
                        <div className="flex items-center justify-center h-full text-gray-500 gap-2">
                            Henüz mesaj yok
                        </div>
                    )}
                    {messageGroups &&
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
                        ))}
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

            <form action={formAction} className="flex gap-2 items-center">
                <input
                    className="flex-grow p-6 border border-gray-300 focus:outline-none"
                    required
                    name="content"
                    placeholder="Mesajınızı yazın..."
                />
                <SubmitButton
                    title={
                        <div className="w-4 h-4">
                            <SendIcon />
                        </div>
                    }
                />
            </form>
        </div>
    );
}
