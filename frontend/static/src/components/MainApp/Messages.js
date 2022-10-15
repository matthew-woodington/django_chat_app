import { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import MessageItem from "./MessageItem";


function Messages(props) {
  const [messages, setMessages] = useState([]);

  const handleError = (err) => {
    console.warn(err);
  };

  const getMessages = useCallback(async () => {
    const response = await fetch(`/api_v1/chats`).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      setMessages(data);
    }
  }, []);

  useEffect(() => {
    getMessages();
  }, [getMessages]); // dependency, when this changes the methods trigger again

  if (!messages) {
    return <div>Fetching data ...</div>;
  }

  const messageList = messages
    .filter((message) => props.filter ? message.room === props.filter : message)
    .map((message) => <MessageItem key={message.id} message={message}/>);

  return (
    <div>
        <ul>{messageList}</ul>
    </div>
  );
}

export default Messages;