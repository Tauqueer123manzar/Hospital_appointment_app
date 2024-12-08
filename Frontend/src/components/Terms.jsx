import React from 'react';
import { Container, Card, Row, Col, Accordion, ListGroup } from 'react-bootstrap'; // Ensure ListGroup is imported
import Topbar from './Topbar';
import Footer from './Footer';

const Terms = () => {
  return (
    <>
      <Container className="py-5 mt-5">
      <Topbar />
        <Card className="shadow-sm">
          <Card.Header as="h2" className="bg-primary text-white py-3 text-center">
            Terms and Conditions
          </Card.Header>
          <Card.Body>
            <Accordion defaultActiveKey="0">
              {/* For Patients */}
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <strong>Patient Terms & Conditions</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      1. Appointment Scheduling:
                      <ul className="mt-2">
                        <li>Patients must provide accurate personal and medical information</li>
                        <li>24-hour notice required for appointment cancellation</li>
                        <li>Missed appointments may incur additional charges</li>
                      </ul>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      2. Payment Terms:
                      <ul className="mt-2">
                        <li>Payment is required at the time of service</li>
                        <li>Insurance information must be provided prior to appointment</li>
                        <li>Co-payments are due at check-in</li>
                      </ul>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              {/* For Doctors */}
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <strong>Doctor Terms & Conditions</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      1. Professional Requirements:
                      <ul className="mt-2">
                        <li>Must maintain valid medical license</li>
                        <li>Required to update credentials regularly</li>
                        <li>Must maintain professional liability insurance</li>
                      </ul>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      2. Appointment Management:
                      <ul className="mt-2">
                        <li>Timely attendance to scheduled appointments</li>
                        <li>Proper maintenance of patient records</li>
                        <li>Emergency coverage arrangements required</li>
                      </ul>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              {/* For Hospital */}
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <strong>Hospital Terms & Conditions</strong>
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      1. Facility Requirements:
                      <ul className="mt-2">
                        <li>Maintain all required licenses and certifications</li>
                        <li>Provide adequate medical equipment and facilities</li>
                        <li>Ensure proper sanitation and safety standards</li>
                      </ul>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      2. Service Standards:
                      <ul className="mt-2">
                        <li>24/7 emergency services availability</li>
                        <li>Compliance with medical regulations</li>
                        <li>Patient data protection and privacy</li>
                      </ul>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            <Row className="mt-4">
              <Col>
                <Card.Text className="text-muted text-center">
                  By using our services, you agree to these terms and conditions.
                  Last updated: {new Date().toLocaleDateString()}
                </Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
      <hr className="text-light" />
      <Footer />
    </>
  );
};

export default Terms;
