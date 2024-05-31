import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../css/styles.css'; // Ensure your styles are properly imported

const ViewListPage = () => {
    const [sessions, setSessions] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/api/chats')
            .then(response => {
                console.log(response.data);
                setSessions(response.data);
            })
            .catch(error => {
                console.error('Error fetching sessions:', error);
                setError('Error fetching sessions. Please try again later.');
            });
    }, []);

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>상담 세션 목록</h1>
            </header>
            <div className="session-list">
                {error && <p className="error-message">{error}</p>}
                {sessions.length > 0 ? (
                    sessions.map((session, index) => (
                        <Link key={session.id} to={`/chats/${session.id}`} className="session-item">
                            <div className="session-content">
                                <h2>세션 {index + 1}</h2>
                                <p>상태: {session.status}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No sessions available.</p>
                )}
            </div>
        </div>
    );
};


export default ViewListPage;