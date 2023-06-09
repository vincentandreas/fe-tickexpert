"use client";

import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button, Container, Row, Col, Nav,NavLink} from 'react-bootstrap';
import { useState } from "react";
export default function Login() {
  const [inputUsername, setInputUsername] = useState("");
  const [inputPswd, setInputPswd] = useState("");
  const login = () => {
    var reqJson = JSON.stringify({
      user_name : inputUsername,
      password : inputPswd
    })
    console.log(reqJson);
    fetch("http://localhost:10000/api/user/login", {
      mode: "cors",
      method: "POST",
      body: reqJson,
      headers: {
        "content-type": "text/plain",
      },
    }).then(response => {
      const cookie = response.headers.get('Set-Cookie');
      console.log("isi cookie " + cookie)
      document.cookie = cookie;
  
      return response.json();
    }).then(respJson =>{
      console.log(respJson);
    })
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
    <Row>
      <Col>
        <h2>Ticket Expert</h2>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
        >
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
          <NavLink href="/register">
            Don't have an account? Register
          </NavLink>
        </Nav>
      </Col>
    </Row>
  </Container>
  )
}
