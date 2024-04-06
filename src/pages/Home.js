import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DiffViewerComponent from "../components/DiffViewerComponent";

function Home() {
  const [defaultResume, setDefaultResume] = useState();
  const [responseLoaded, setResponseLoaded] = useState(false);

  return (
    <>
      <h1>AI Resume Optimizer</h1>
      <Form>
        <Container fluid>
          <Row>
            <Col
              xs={10}
              md={5}
              style={{
                display: "block",
                margin: "auto",
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Job description</Form.Label>
                <Form.Control as="textarea" rows={15} />
              </Form.Group>
            </Col>
            <Col
              xs={10}
              md={5}
              style={{
                display: "block",
                margin: "auto",
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Current resume</Form.Label>
                <Form.Control as="textarea" rows={15} />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col
              xs={10}
              md={5}
              style={{
                display: "block",
                margin: "auto",
              }}
            ></Col>
            <Col
              xs={10}
              md={5}
              style={{
                display: "block",
                margin: "auto",
              }}
            >
              <Button variant="outline-success">Save as default resume</Button>
            </Col>
          </Row>
        </Container>
        <div style={{ margin: "20px auto" }}>
          <Button variant="primary">Optimize Resume</Button>
        </div>
      </Form>

      <DiffViewerComponent />
    </>
  );
}

export default Home;
