import { Message } from '@/types';

const OutgoingMessage = ({ message }: { message: Message }) => {
    const now = new Date(message.createdDate);
    const hour = now.getHours();
    const minute = now.getMinutes();

    const boxStyle: React.CSSProperties = {
        maxWidth: '50%',
        backgroundColor: '#1976d2',
        color: 'white',
        padding: 16,
        borderRadius: '0 10px 10px 10px',
        marginBottom: 8,
        alignSelf: 'flex-end',
    };

    const timeStyle: React.CSSProperties = {
        fontSize: '0.75rem',
        color: '#666',
    };

    return (
        <div className="flex justify-end">
            <div style={boxStyle}>
                <div className="flex justify-baseline items-center gap-1">
                    <p style={{ margin: 0 }}>{message.content}</p>
                    <span style={timeStyle}>
                        {hour < 10 ? `0${hour}` : hour}:
                        {minute < 10 ? `0${minute}` : minute}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default OutgoingMessage;
