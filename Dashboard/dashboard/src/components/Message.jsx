// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import axios from 'axios';
// import '../App.css';

// const Message = () => {
//   const [message, setMessage] = useState([]);

//   // Fetch messages from API
//   useEffect(() => {
//     const fetchMessage = async () => {
//       try {
//         const response = await axios.get("http://localhost:8080/api/v1/message/getall", {
//           withCredentials: true,
//         });
//         setMessage(response.data);
//       } catch (error) {
//         console.log("Error fetching messages:", error);
//       }
//     };
//     fetchMessage();
//   }, []);

//   return (
//     <Container className="my-4" style={{ marginLeft: "350px" }}>
//       <h2 text-center>Messages</h2>
//       <Row>
//         {message.map((message, index) => (
//           <Col md={6} lg={5} key={index} className="mb-3">
//             <Card className="message-card">
//               <Card.Header>
//                 <h5>{message.senderName}</h5>
//                 <small>{new Date(message.date).toLocaleDateString()}</small>
//               </Card.Header>
//               <Card.Body>
//                 <Card.Text><strong>Name:</strong> {message.firstname} {message.lastname}</Card.Text>
//                 <Card.Title><strong>Email:</strong> {message.email}</Card.Title>
//                 <Card.Subtitle className="mb-2 text-muted"><strong>Phone Number:</strong> {message.phonenumber}</Card.Subtitle>
//                 <Card.Text><strong>Message:</strong> {message.message}</Card.Text>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// }

// export default Message;
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

const Message = () => {
  const [message, setMessage] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const adminToken = localStorage.getItem("adminToken");

        // Check if the token is available
        if (!adminToken) {
          console.error("Admin token is missing");
          setError("Admin token is missing. Please log in again.");
          return;
        }

        const response = await axios.get("http://localhost:8080/api/v1/message/getall", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`, // Add token here
          },
        });
        
        setMessage(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
        setError("Failed to load messages. Please try again later.");
      }
    };
    
    fetchMessage();
  }, []);

  return (
    <Container className="my-2" style={{ marginLeft: "300px" }}>
    <h2 className="text-center p-1" style={{ fontFamily: "initial" }}>Messages</h2>
    
    {error ? (
      <p className="text-center text-danger">{error}</p>
    ) : (
      <Row>
        {message.length > 0 ? (
          message.map((message, index) => (
            <Col md={6} lg={5} key={index} className="mb-3">
              <Card className="message-card">
                <Card.Body>
                  <Card.Text><strong>Name:</strong> {message.firstname} {message.lastname}</Card.Text>
                  <Card.Title><strong>Email:</strong> {message.email}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"><strong>Phone Number:</strong> {message.phonenumber}</Card.Subtitle>
                  <Card.Text><strong>Message:</strong> {message.message}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <p className="text-center">No messages found.</p>
        )}
      </Row>
    )}
  </Container>
  );
}

export default Message;


