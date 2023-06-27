import { Logout } from "@/utils/useAuth";
import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { getCookie } from "cookies-next";

const MyNavbar = ({ onNavbarClick }) => {
  const handleLogout = () => {
    Logout();
  };

  const handleClick = (componentName) => {
    onNavbarClick(componentName);
  };
  let userRole = getCookie("role");

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand onClick={() => handleClick("homes")}>
        Ticket Expert
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={() => handleClick("events")}>Events</Nav.Link>
          <Nav.Link onClick={() => handleClick("bookings")}>Bookings</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {userRole === "PROMOTOR" && (
            <Nav.Link onClick={() => handleClick("createEvents")}>
              Create event
            </Nav.Link>
          )}
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
