import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import { context } from '../main';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Table from 'react-bootstrap/Table';
const Message = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(context);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/message/getall", {
          withCredentials: true,
          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("adminToken")}`
          }
        });
        console.log("Response:", response.data);
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Error fetching messages:", error.response);
        toast.error(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
  <Container className="my-2" style={{ marginLeft: "290px" }}>
  <h2 className="text-center p-1" style={{ fontFamily: "initial" }}>Messages</h2>
  <Row className="my-2 mx-2">
    {messages && messages.length > 0 ? (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((item) => (
            <tr key={item._id}>
              <td>{item.firstname} {item.lastname}</td>
              <td>{item.email}</td>
              <td>{item.phonenumber}</td>
              <td>{item.message}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <h1>No Messages We have yet</h1>
    )}
  </Row>
</Container>
  );
}

export default Message;
