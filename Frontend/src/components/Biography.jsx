import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import '../App.css';

const Biography = ({ imageurl }) => {
  return (
    <Container fluid className="p-0">
      <div className="biography">
        <Row className="g-0">
          {/* Image Column */}
          <Col lg={7} md={6} sm={12} className="order-lg-1 order-md-1 order-sm-2">
            <img
              className="biography_image img-fluid w-100"
              src={imageurl}
              alt="missing image"
              style={{ height: '100%', objectFit: 'cover' }}
            />
          </Col>

          {/* Text Column */}
          <Col lg={5} md={6} sm={12} className="order-lg-2 order-md-2 order-sm-1 p-4 p-lg-5">
            <p className="mt-3 mt-lg-5 fs-3 fw-bold" style={{ fontFamily: 'initial' }}>
              BIOGRAPHY
            </p>
            <h3 className="fw-bold">Who We Are</h3>
            <p className="fs-5">
              EasyCare clinic, founded in 1985, has been a cornerstone of medical excellence and compassionate care in our community for nearly four decades. Nestled in the heart of downtown, our state-of-the-art facility is renowned for its commitment to delivering top-tier healthcare services to patients from all walks of life.
            </p>
            <p className="fs-5">
              Since our inception, EasyCare clinic has grown from a small community hospital to a leading healthcare provider. Our journey has been marked by significant milestones, including the establishment of our advanced cardiac care center, the opening of our state-of-the-art cancer treatment facility, and the launch of numerous community health initiatives.
            </p>
            <p className="fs-5">
              This biography highlights the hospital's mission, values, services, history, and community involvement, painting a comprehensive picture of what makes EasyCare clinic a trusted healthcare provider.
            </p>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Biography;