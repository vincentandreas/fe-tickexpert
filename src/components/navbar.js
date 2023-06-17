import { Logout } from '@/utils/useAuth';
import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const MyNavbar = () => {

    const handleLogout = () =>{
        Logout();
    }
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">My Website</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/events">Events</Nav.Link>
          <Nav.Link href="/bookings">Bookings</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <NavDropdown title="Account" id="basic-nav-dropdown">
            <NavDropdown.Item href="/account">See Account Detail</NavDropdown.Item>
            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;
