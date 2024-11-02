import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import { context } from '../main';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Message = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(context);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log("Fetching messages...");
        const response = await axios.get("http://localhost:8080/api/v1/message/getall", {
          withCredentials: true,
        });
        console.log("Response:", response.data);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error.response);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Container className="my-2" style={{ marginLeft: "300px" }}>
      <h2 className="text-center p-1" style={{ fontFamily: "initial" }}>Messages</h2>
      <Row className='my-2 mx-2'>
        {messages && messages.length > 0 ? (messages.map((item) => (
          <Card className='my-2' key={item._id}>
            <Card.Body>
              <Card.Title><span>Name:</span>{item.firstname} {item.lastname}</Card.Title>
              <Card.Subtitle><span>Email:</span>{item.email}</Card.Subtitle>
              <Card.Subtitle><span>Phone:</span>{item.phone}</Card.Subtitle>
              <Card.Text>{item.message}</Card.Text>
            </Card.Body>
          </Card>
        ))) : (<h1>No Messages We have yet</h1>)}
      </Row>
    </Container>
  );
}

export default Message;
