import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

const Message = () => {
  // const [message, setMessage] = useState([]);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchMessage = async () => {
  //     try {
  //       const adminToken = localStorage.getItem("adminToken");

  //       // Check if the token is available
  //       if (!adminToken) {
  //         console.error("Admin token is missing");
  //         setError("Admin token is missing. Please log in again.");
  //         return;
  //       }

  //       const response = await axios.get("http://localhost:8080/api/v1/message/getall", {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${adminToken}`, // Add token here
  //         },
  //       });
        
  //       setMessage(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching messages:", error);
  //       setError("Failed to load messages. Please try again later.");
  //     }
  //   };
    
  //   fetchMessage();
  // }, []);

  return (
    <Container className="my-2" style={{ marginLeft: "300px" }}>
    <h2 className="text-center p-1" style={{ fontFamily: "initial" }}>Messages</h2>
    <Card>
      <Card.Header>Tauqueer manzar</Card.Header>
      <Card.Body>
        <Card.Title>Messaging for appointment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <Card>
      <Card.Header>Tauqueer manzar</Card.Header>
      <Card.Body>
        <Card.Title>Messaging for appointment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <Card>
      <Card.Header>Tauqueer manzar</Card.Header>
      <Card.Body>
        <Card.Title>Messaging for appointment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <Card>
      <Card.Header>Tauqueer manzar</Card.Header>
      <Card.Body>
        <Card.Title>Messaging for appointment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <Card>
      <Card.Header>Tauqueer manzar</Card.Header>
      <Card.Body>
        <Card.Title>Messaging for appointment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <Card>
      <Card.Header>Tauqueer manzar</Card.Header>
      <Card.Body>
        <Card.Title>Messaging for appointment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br></br>
    <Card>
      <Card.Header>Tauqueer manzar</Card.Header>
      <Card.Body>
        <Card.Title>Messaging for appointment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
      </Card.Body>
    </Card>
  </Container>
  );
}

export default Message;


