import { Message } from '@/types';

const IncomingMessage = ({ message }: { message: Message }) => {
    const now = new Date(message.createdDate);
    const hour = now.getHours();
    const minute = now.getMinutes();

    const boxStyle: React.CSSProperties = {
        maxWidth: '50%',
        backgroundColor: '#e0e0e0',
        color: 'black',
        padding: 16,
        borderRadius: '0 10px 10px 10px',
        marginBottom: 8,
        alignSelf: 'flex-start',
    };

    const timeStyle: React.CSSProperties = {
        fontSize: '0.75rem',
        color: '#666',
    };

    return (
        <div className="flex justify-start">
            <div style={boxStyle}>
                <div className="flex justify-between items-center gap-1">
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

export default IncomingMessage;
