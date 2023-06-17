"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Nav,
  NavLink,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function Register() {
  const [inputFname, setInputFname] = useState("");
  const [inputUsername, setInputUsername] = useState("");
  const [inputPswd, setInputPswd] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { push } = useRouter();

  const register = () => {
    var reqJson = JSON.stringify({
      user_name: inputUsername,
      password: inputPswd,
      full_name: inputFname,
    });
    console.log(reqJson);
    fetch("http://localhost:10000/api/user", {
      mode: "cors",
      method: "POST",
      body: reqJson,
      headers: {
        "content-type": "text/plain",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((respJson) => {
        if (respJson["response_code"] == "00") {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
            push("/login");
          }, 3000);
        }
      });
  };

  return (
    <div>
      {showAlert && (
        <Alert variant="success" style={{ width: "42rem" }}>
          <Alert.Heading>Register success</Alert.Heading>
        </Alert>
      )}

      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Row>
          <Col>
            <h2>Ticket Expert</h2>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                register();
              }}
            >
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputFname">Full Name</Form.Label>
                <Form.Control
                  type="text"
                  id="inputFname"
                  onChange={(e) => setInputFname(e.target.value)}
                  placeholder="Enter full name"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputUsername">Username</Form.Label>
                <Form.Control
                  type="text"
                  id="inputUsername"
                  onChange={(e) => setInputUsername(e.target.value)}
                  placeholder="Enter username"
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="inputPswd">Password</Form.Label>
                <Form.Control
                  type="password"
                  id="inputPswd"
                  onChange={(e) => setInputPswd(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
            <Nav className="justify-content-end mt-3">
              <NavLink href="/login">Already have an account? Login</NavLink>
            </Nav>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
