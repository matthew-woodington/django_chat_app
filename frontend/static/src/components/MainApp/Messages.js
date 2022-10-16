import { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import MessageItem from "./MessageItem";
import Form from 'react-bootstrap/Form';


function Messages(props) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      text,
      room: props.activeRoom,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
      },
      body: JSON.stringify(message),
    };
    const response = await fetch("/api_v1/chats/", options).catch(handleError);
    if (!response.ok) {
      throw new Error("Network response was not OK");
    } else {
      const data = await response.json();
      console.log(data);
      getMessages()
      setText('')
    }
  };

  const messageList = messages
    .filter((message) => props.filter ? message.room === props.filter : message)
    .map((message) => <MessageItem key={message.id} message={message}/>);

  return (
    <div className="send-recieve">
        <ul className="list">{messageList}</ul>
        <div className="messeger">
            <Form onSubmit={handleSubmit} className="row align-items-end">
                <Form.Group className="col-10" controlId="message">
                    <Form.Label></Form.Label>
                    <Form.Control
                        required
                        placeholder="Message"
                        type="text" 
                        value={text}
                        onChange={(e) => setText(e.target.value)} />
                </Form.Group>
                <div className="button-container col-2 ms-auto">
                    <Button className="send-button" variant="primary" type="submit">
                        Send
                    </Button>
                </div>
            </Form>
        </div>
    </div>
  );
}

export default Messages;