import { Logout } from "@/utils/useAuth";
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const MyNavbar = ({ onNavbarClick }) => {
  const handleLogout = () => {
    Logout();
  };

  const handleClick = (componentName) => {
    onNavbarClick(componentName);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Ticket Expert</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleClick("events")}>Events</Nav.Link>
          <Nav.Link onClick={() => handleClick("bookings")}>Bookings</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={() => handleClick("accDetails")}>
              See Account Detail
            </NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
