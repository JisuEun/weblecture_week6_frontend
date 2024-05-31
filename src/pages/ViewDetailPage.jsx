import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../css/styles.css'; // Ensure your styles.css is correctly imported

const ViewDetailPage = () => {
    const { id } = useParams();
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch messages for a specific session
        fetch(`http://localhost:3001/api/chats/${id}`)
            .then(response => response.json())
            .then(data => setMessages(data))
            .catch(error => console.error('Error fetching messages:', error));
    }, [id]);

    // Function to determine the CSS class based on the message sender
    const getMessageClass = (sender) => {
        switch (sender) {
            case 'Counselor':
                return 'my-message';
            case 'Counselee':
                return 'other-message';
            default:
                return 'system-message'; // Assume 'System' or undefined senders get system message style
        }
    };

    const handleBack = () => {
        navigate('/chats');
    }

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>세션 {id} 기록</h1>
                <button onClick={handleBack} className="chat-nav-button">돌아가기</button> {/* Back button */}
            </header>
            <div className="messages-display">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${getMessageClass(msg.type)}`}>
                        {msg.content}
                    </div>
                ))}
            </div>
            <div className="input-section">
                {/* Input section can be used for reply or actions */}
            </div>
        </div>
    );
};

export default ViewDetailPage;