"use client";

import 'bootstrap/dist/css/bootstrap.min.css'
import {Form, Button} from 'react-bootstrap';

export default function Home() {
  return (
    <Form>
    <Form.Group>
      <label htmlFor="exampleInputEmail1">Email address</label>
      <Form.Control type="email" id="exampleInputEmail1" placeholder="Enter email" />
      <Form.Text text="muted">We'll never share your email with anyone else.</Form.Text>
    </Form.Group>
    <Form.Group>
      <label htmlFor="exampleInputPassword1">Password</label>
      <Form.Control type="password" id="exampleInputPassword1" placeholder="Password" />
    </Form.Group>
    <Button primary type="submit">Submit</Button>
  </Form>
  )
}
