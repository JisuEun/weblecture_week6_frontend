// useChat.js
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useChat = (role) => {
    const [messages, setMessages] = useState([]);
    const [counseleeStats, setCounseleeStats] = useState({
        session: 0,
        total: 0,
        today: 0
    });
    const ENDPOINT = 'http://localhost:3001';
    const socket = useRef(null);

    useEffect(() => {
        // 소켓 인스턴스를 설정합니다.
        socket.current = io(ENDPOINT, { autoConnect: false });

        // 필요한 경우 여기서 소켓 이벤트 리스너들을 설정합니다.

        // 연결합니다.
        socket.current.connect();

        // 메시지를 수신할 때 상태를 업데이트합니다.
        socket.current.on('message', (msg) => {
            setMessages((msgs) => [...msgs, msg]);
        });

        // 상담자 수 업데이트 이벤트 수신
        socket.current.on('counselee stats', (stats) => {
            setCounseleeStats(stats);
        });

        // 서버에 현재 역할을 등록합니다.
        socket.current.emit('register', role);

        // 컴포넌트가 언마운트되면 소켓 연결을 종료합니다.
        return () => {
            socket.current.emit('unregister', role);
            socket.current.disconnect();
        };
    }, [role]);

    // 메시지를 보내는 함수입니다.
    const sendMessage = (message) => {
        if (message) {
            socket.current.emit('message', { text: message, sender: role });
        }
    };

    return { messages, sendMessage, setMessages, socket: socket.current, counseleeStats };
};