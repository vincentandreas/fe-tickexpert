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
import EventCrPage from "./events/create/page";
import HomePage from "@/components/guest";
import { getCookie } from "cookies-next";

export default function LandingPage() {
  const [activeComponent, setActiveComponent] = useState("homes");

  const handleClick = (componentName) => {
    setActiveComponent(componentName);
  };

  useAuthentication();
  let userRole = getCookie("role");
  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <MyNavbar onNavbarClick={handleClick} />
      <div>
        {activeComponent === "homes" && <HomePage />}
        {userRole === "USER" && activeComponent === "bookings" && (
          <BookingPage />
        )}
        {userRole === "USER" && activeComponent === "events" && <EventPage />}
        {activeComponent === "accDetails" && <AccountPage />}
        {userRole === "PROMOTOR" && activeComponent === "createEvents" && (
          <EventCrPage />
        )}
        {/* Add more conditions for other components */}
      </div>
    </div>
  );
}
