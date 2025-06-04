import { Message } from '@/types';
import ImageWithSkeleton from '../common/imageSkeleton';
import { PersonIcon } from '../icons';

const OutgoingMessage = ({ message }: { message: Message }) => {
    const now = new Date(message.createdDate);
    const hour = now.getHours();
    const minute = now.getMinutes();

    const boxStyle: React.CSSProperties = {
        maxWidth: '50%',
        backgroundColor: '#1976d2',
        color: 'white',
        padding: 16,
        borderRadius: '10px 10px 0px 10px',
        marginBottom: 8,
        alignSelf: 'flex-end',
        position: 'relative',
    };

    const timeStyle: React.CSSProperties = {
        fontSize: '0.75rem',
        color: '#e3e3e3',
        position: 'absolute',
        bottom: 4,
        right: 8,
    };

    return (
        <div className="flex flex-col items-end mb-2">
            <div className="text-xs text-gray-500 mb-1 mr-12">
                <span className="font-medium">{message.senderName}</span>
            </div>
            <div className="flex justify-end gap-2 w-full">
                <div style={boxStyle}>
                    <p style={{ margin: 0, marginBottom: 14 }}>{message.content}</p>
                    <span style={timeStyle}>
                        {hour < 10 ? `0${hour}` : hour}:
                        {minute < 10 ? `0${minute}` : minute}
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    {message.senderProfileImage ? (
                        <ImageWithSkeleton
                            src={message.senderProfileImage}
                            alt="Gönderen Profil Görseli"
                            width={40}
                            height={40}
                            className="object-cover w-full h-full rounded-full border border-gray-200"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full border border-gray-200">
                            <PersonIcon />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OutgoingMessage;
