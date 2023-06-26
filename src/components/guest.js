"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Row,
  Col,
  Nav,
  NavLink,
  Image,
} from "react-bootstrap";
export default function GuestPage() {
  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <Container className="text-center mt-5">
        <Image src="concert-banner.jpg" />
        <h2>Ticket Expert</h2>
        <p>Explore and connect with Ticket Expert.</p>
        <Nav className="justify-content-center">
          <NavLink href="/login">Login</NavLink>
        </Nav>
      </Container>
    </div>
  );
}
