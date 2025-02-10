'use client'
import React from 'react';
import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import Topbar from './Topbar';
import Footer from './Footer';
const Privacy = () => {
  return (
    <>
    <Container fluid className="py-5 mt-5">
    <Topbar/>
      <Card className="shadow-sm m-2c">
        <Card.Header as="h2" className="bg-primary text-white py-3">
          Privacy Policy
        </Card.Header>
        <Card.Body>
          <Row className="mb-4">
            <Col>
              <h4 className="mb-3">Your Health Information Privacy Rights</h4>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 ps-0">
                  <i className="fas fa-shield-alt me-2 text-primary"></i>
                  Your medical information is kept strictly confidential
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  <i className="fas fa-lock me-2 text-primary"></i>
                  Access to your records is strictly controlled
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  <i className="fas fa-user-shield me-2 text-primary"></i>
                  Your data is encrypted and securely stored
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <h4 className="mb-3">How We Use Your Information</h4>
              <Card.Text>
                We collect and use your information to:
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 ps-0">
                  • Provide and improve our healthcare services
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  • Schedule and manage appointments
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  • Communicate important health information
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  • Process payments and insurance claims
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col>
              <h4 className="mb-3">Your Rights</h4>
              <Card.Text>
                You have the right to:
              </Card.Text>
              <ListGroup variant="flush">
                <ListGroup.Item className="border-0 ps-0">
                  • Request access to your health records
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  • Request corrections to your information
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  • Receive a copy of your health records
                </ListGroup.Item>
                <ListGroup.Item className="border-0 ps-0">
                  • Know who has accessed your information
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
    <Footer/>
    </>
  );
};

export default Privacy;
