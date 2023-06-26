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
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useAuthentication } from "@/utils/useAuth";
import axios from "axios";

const EventDetailsPage = ({ params }) => {
  let eventId = params.eventId;
  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const { push } = useRouter();
  useAuthentication();
  useEffect(() => {
    if (eventId) {
      fetch("http://localhost:10000/api/event/" + eventId, {
        mode: "cors",
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "text/plain",
        },
      })
        .then((response) => response.json())
        .then((data) => setEvent(data["data"]))
        .catch((error) => console.log(error));
    }
  }, [eventId]);

  let qcode = getCookie("q_unique_code");

  const handleOrder = () => {
    var reqbody = {
      event_id: parseInt(eventId),
    };
    const waitQueueUrl = "http://localhost:10000/api/waitingQueue";
    axios
      .post(waitQueueUrl, reqbody, {
        timeout: 30000,
        withCredentials: true,
        headers: {
          "content-type": "text/plain",
        },
      })
      .then((res) => {
        console.log("dalem res");
        console.log(res);
        if (res.data?.response_code === "00") {
          deleteCookie("q_unique_code");
          setCookie("q_unique_code", res.data?.data?.q_unique_code);
          deleteCookie("event_id");
          setCookie("event_id", eventId);
          push("events/waitingRoom");
        } else {
          alert(res.data?.response_message);
        }
      })
      .catch((err) => {
        alert(err.response.data.response_message);
      });
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <Container className="mt-5">
        <Row>
          {/* <Col>
          <Image src={event.imageUrl} fluid />
        </Col> */}
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>{event.event_name}</Card.Title>
                <Card.Text>{event.event_desc}</Card.Text>
                {event.event_details != null &&
                  event.event_details.map((ticketType, index) => (
                    <div key={index}>
                      <p>
                        {ticketType.ticket_class} Rp {ticketType.ticket_price}
                      </p>
                      <p>Remaining: {ticketType.ticket_remaining}</p>
                      <hr />
                    </div>
                  ))}
                <Button variant="primary" onClick={handleOrder}>
                  Order
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default EventDetailsPage;
