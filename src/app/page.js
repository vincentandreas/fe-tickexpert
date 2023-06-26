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
import MyNavbar from "@/components/navbar";
import { useAuthentication } from "@/utils/useAuth";
import BookingPage from "./bookings/page";
import EventPage from "./events/page";
import { useState } from "react";
import AccountPage from "./account/page";

export default function LandingPage() {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  useAuthentication();

  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <MyNavbar onNavbarClick={handleClick} />
      <div>
        {activeComponent === "bookings" && <BookingPage />}
        {activeComponent === "events" && <EventPage />}
        {activeComponent === "accDetails" && <AccountPage />}
        {/* Add more conditions for other components */}
      </div>
    </div>
  );
}
