// CounseleeChat.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import '../css/styles.css';

const CounseleeChat = () => {
    const [message, setMessage] = useState('');
    const { messages, sendMessage, socket, setMessages } = useChat('Counselee');
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        if (socket) {
            const handleChatEnded = (message) => {
                alert(message);
                socket.disconnect();
                navigate('/');
            };
    
            socket.on('chat ended', handleChatEnded);
    
            return () => {
                socket.off('chat ended', handleChatEnded);
            };
        }
    }, [socket, navigate]);

    const handleSendMessage = (event) => {
        event.preventDefault();
        if (message.trim()) {
            const newMessage = { text: message, sender: 'Counselee' };
            sendMessage(message); // 메시지를 서버로 전송
            console.log("상담자가 메시지를 전송했습니다:", message);
            setMessage(''); // 입력 필드 초기화
            setMessages(messages => [...messages, newMessage]); // 메시지 목록에 새 메시지 추가
        }
    };

    const getMessageClass = (sender) => {
        if (sender === 'Counselee') {
            return 'my-message';
        } else if (sender === 'System') {
            return 'system-message';
        } else {
            return 'other-message';
        }
    };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>상담자 페이지</h1>
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

export default CounseleeChat;