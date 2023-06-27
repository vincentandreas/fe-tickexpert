"use client";
import "bootstrap/dist/css/bootstrap.min.css";
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
import { deleteCookie, getCookie } from "cookies-next";
import { useAuthentication } from "@/utils/useAuth";
import axios from "axios";

const OrderRoom = () => {
  useAuthentication();
  const [eventDetails, setEventDetails] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const { push } = useRouter();

  // let bookingDetailObj = {}
  let eventId = getCookie("event_id");
  useEffect(() => {
    console.log("useeff");
    if (eventId) {
      fetch("http://localhost:10000/api/event/" + eventId, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "text/plain",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setEventDetails(data["data"]["event_details"]);
        })
        .catch((error) => console.log(error));
    }
  }, [eventId]);

  let qcode = getCookie("q_unique_code");

  const handleSubmit = () => {
    console.log("isi book detials");
    console.log(bookingDetails);
    if (bookingDetails.length == 0) {
      alert("Booking couldn't be empty!");
      return;
    }

    var reqbody = {
      event_id: parseInt(eventId),
      q_unique_code: qcode,
      booking_details: bookingDetails,
    };
    const bookUrl = "http://localhost:10000/api/book";

    axios
      .post(bookUrl, reqbody, {
        timeout: 30000,
        withCredentials: true,
        headers: {
          "content-type": "text/plain",
        },
      })
      .then((res) => {
        console.log("dalem res");
        console.log(res);

        if (res.data?.response_code == "00") {
          alert("Success book ticket");
          deleteCookie("q_unique_code");
          push("/");
        } else {
          alert(res.data?.response_message);
        }
      })
      .catch((err) => {
        alert(err.response.data.response_message);
      });
  };

  const [bookingDetails, setBookingDetails] = useState([]);

  const handleQuantityChange = (eventDetailId, quantityStr) => {
    let quantity = parseInt(quantityStr);
    const updatedBookingDetails = [...bookingDetails];
    const existingIndex = updatedBookingDetails.findIndex(
      (detail) => detail.event_detail_id === eventDetailId
    );

    if (existingIndex !== -1) {
      updatedBookingDetails[existingIndex].qty = quantity;
    } else {
      updatedBookingDetails.push({
        event_detail_id: eventDetailId,
        qty: quantity,
      });
    }

    setBookingDetails(updatedBookingDetails);
  };

  if (!eventDetails) {
    return <p>Loading event details...</p>;
  }
  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <h2>Order Ticket</h2>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        {eventDetails.map((eD) => (
          <Card key={eD.ID} className="mb-3" style={{ width: "50%" }}>
            <Card.Body>
              <Card.Title>{eD.ticket_class}</Card.Title>
              <Card.Text>
                Ticket Quota: {eD.ticket_quota} | Ticket Remaining:{" "}
                {eD.ticket_remaining}
              </Card.Text>
              <Form.Group
                controlId={`quantity-${eD.ID}`}
                className="d-flex align-items-center justify-content-end"
              >
                <Form.Label className="mr-2" style={{ marginBottom: 0 }}>
                  Quantity:
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  max={eD.ticket_remaining}
                  value={
                    bookingDetails.find(
                      (detail) => detail.event_detail_id === eD.ID
                    )?.qty || ""
                  }
                  onChange={(e) => handleQuantityChange(eD.ID, e.target.value)}
                  className="text-right"
                  style={{ marginLeft: "1rem" }}
                />
              </Form.Group>
            </Card.Body>
          </Card>
        ))}

        <Button type="submit">Book Tickets</Button>
      </Form>
    </div>
  );
};

export default OrderRoom;
