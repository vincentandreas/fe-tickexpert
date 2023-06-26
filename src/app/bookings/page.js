"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import EventTable from "../../utils/eventTable";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Image,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useAuthentication } from "@/utils/useAuth";

const BookingPage = () => {
  console.log("BookingPage");
  const [booking, setBooking] = useState([]);
  useAuthentication();
  useEffect(() => {
    fetch("http://localhost:10000/api/book", {
      mode: "cors",
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "text/plain",
      },
    })
      .then((response) => {
        if (!response.ok) {
          alert("Response not ok, redirecting to login page");
          push("/login");
        }
        return response.json();
      })
      .then((data) => {
        console.log("isi data");
        console.log(data);
        if (
          data["response_code"] != undefined &&
          data["response_code"] === "00"
        ) {
          setBooking(data["data"]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <h2>Booking List</h2>
      <EventTable events={booking} />
    </div>
  );
};

export default BookingPage;
