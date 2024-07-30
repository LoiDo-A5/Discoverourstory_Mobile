import {useEffect, useState} from 'react';

function useChat(roomId) {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${roomId}/`);
    setWs(websocket);

    websocket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    websocket.onmessage = event => {
      console.log('Received message:');
      const data = JSON.parse(event.data);
      setMessages(prev => [...prev, data]);
    };

    websocket.onerror = event => {
      console.error('WebSocket error observed:', event);
    };

    websocket.onclose = event => {
      console.log('WebSocket connection closed:', event);
    };

    return () => {
      websocket.close();
    };
  }, [roomId]);

  const sendMessage = (message, username) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      const messageData = JSON.stringify({message, username});
      console.log('Sending message:', messageData);
      ws.send(messageData);
    }
  };

  return {messages, sendMessage};
}

export default useChat;
