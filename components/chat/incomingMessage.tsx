import { Message } from '@/types';
import ImageWithSkeleton from '../common/imageSkeleton';
import { PersonIcon } from '../icons';

const IncomingMessage = ({ message }: { message: Message }) => {
    const now = new Date(message.createdDate);
    const hour = now.getHours();
    const minute = now.getMinutes();

    const boxStyle: React.CSSProperties = {
        maxWidth: '50%',
        backgroundColor: '#e0e0e0',
        color: 'black',
        padding: 16,
        borderRadius: '10px 10px 10px 0px',
        marginBottom: 8,
        alignSelf: 'flex-start',
        position: 'relative',
    };

    const timeStyle: React.CSSProperties = {
        fontSize: '0.75rem',
        color: '#666',
        position: 'absolute',
        bottom: 4,
        right: 8,
    };

    return (
        <div className="flex flex-col items-start mb-2">
            <div className="text-xs text-gray-500 mb-1 ml-12">
                <span className="font-medium">{message.senderName}</span>
            </div>
            <div className="flex justify-start gap-2 w-full">
                <div className="flex items-center gap-3">
                    {message.receiverProfileImage ? (
                        <ImageWithSkeleton
                            src={message.receiverProfileImage}
                            alt="Alıcı Profil Görseli"
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

                <div style={boxStyle}>
                    <p style={{ margin: 0, marginBottom: 14 }}>
                        {message.content}
                    </p>
                    <span style={timeStyle}>
                        {hour < 10 ? `0${hour}` : hour}:
                        {minute < 10 ? `0${minute}` : minute}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default IncomingMessage;
