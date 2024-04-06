import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useForm } from "react-hook-form";
import DiffViewerComponent from "../components/DiffViewerComponent";

import resumeService from "../services/resume";

function Home() {
  const { register, handleSubmit, setValue, getValues } = useForm();

  const [currentResume, setCurrentResume] = useState();
  const [optimizedResume, setOptimizedResume] = useState();
  const [responseLoaded, setResponseLoaded] = useState(false);

  useEffect(() => {
    resumeService.getDefaultResume().then((data) => {
      setValue("currentResume", data.defaultResume);
    });
  }, [setValue]);

  const handleSaveDefaultResume = () => {
    resumeService.saveDefaultResume(getValues("currentResume"));
  };

  return (
    <>
      <h1>AI Resume Optimizer</h1>
      <Form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          setCurrentResume(data.currentResume);
          // Backend api call
          setOptimizedResume(
            resumeService.getOptimizedResume(data).optimizedResume
          );
          setResponseLoaded(true);
        })}
      >
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
                <Form.Control
                  as="textarea"
                  rows={15}
                  {...register("jobDescription", { required: true })}
                />
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
                <Form.Control
                  as="textarea"
                  rows={15}
                  {...register("currentResume")}
                />
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
              <Button
                variant="outline-success"
                onClick={handleSaveDefaultResume}
              >
                Save as default resume
              </Button>
            </Col>
          </Row>
        </Container>
        <div style={{ margin: "20px auto" }}>
          {!responseLoaded && (
            <Button variant="primary" type="submit">
              Optimize resume
            </Button>
          )}
          {responseLoaded && (
            <>
              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Custom instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  {...register("customInstructions")}
                />
              </Form.Group> */}
              <Button variant="primary" type="submit">
                Re-optimize resume
              </Button>
            </>
          )}
        </div>
      </Form>

      {responseLoaded && (
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
                <Form.Label>Optimized resume</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={15}
                  value={optimizedResume}
                  {...register("optimizedResume")}
                />
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
              <DiffViewerComponent
                currentResume={currentResume}
                optimizedResume={optimizedResume}
                splitView={false}
              />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
}

export default Home;
