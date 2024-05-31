import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import '../css/styles.css';

const CounselorChat = () => {
    const [message, setMessage] = useState('');
    const { messages, setMessages, sendMessage, counseleeStats } = useChat('Counselor');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (message.trim()) {
            const newMessage = { text: message, sender: 'Counselor' };
            sendMessage(message); // 메시지를 서버로 전송
            console.log("상담자가 메시지를 전달했습니다:", message)
            setMessage(''); // 입력 필드 초기화
            setMessages(messages => [...messages, newMessage]); // 메시지 목록에 새 메시지 추가
        }
    };

    const getMessageClass = (sender) => {
        if (sender === 'Counselor') {
            return 'my-message';
        } else if (sender === 'System') {
            return 'system-message';
        } else {
            return 'other-message';
        }
    };

    const handleNavigateChats = () => {
        window.open('/chats', '_blank');
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>상담사 페이지</h1>
                <div>누적 상담자 수: {counseleeStats.total}</div>
                <div>오늘 상담자 수: {counseleeStats.today}</div>
                <div>접속 후 상담자 수: {counseleeStats.session}</div>
                <button onClick={handleNavigateChats} className="chat-nav-button">
                    상담 내역 조회
                </button>
            </header>
            <div className="messages-display">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${getMessageClass(msg.sender)}`}>
                        {msg.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <div className="input-section">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={({ target: { value } }) => setMessage(value)}
                    onKeyPress={event => event.key === 'Enter' ? handleSendMessage(event) : null}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default CounselorChat;
