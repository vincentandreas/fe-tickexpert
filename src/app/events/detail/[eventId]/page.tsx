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
  Table,
  Button,
  Alert,
} from "react-bootstrap";
import { useEffect } from "react";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import axios from "axios";
import styles from "./eventdetail.module.css";
import { useAuthentication } from "../../../../utils/useAuth";
const EventDetailsPage = ({ params, showButton }) => {
  if (showButton == undefined || showButton == null) {
    showButton = true;
  }
  let eventId = params.eventId;
  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const { push } = useRouter();
  useAuthentication();
  useEffect(() => {
    if (eventId) {
      fetch(`${process.env.SERVER_URL}/api/event/` + eventId, {
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

  const addDefaultSrc = (ev) => {
    ev.target.src =
      "https://getuikit.com/v2/docs/images/placeholder_600x400.svg";
  };

  const handleOrder = () => {
    var reqbody = {
      event_id: parseInt(eventId),
    };
    const waitQueueUrl = `${process.env.SERVER_URL}/api/waitingQueue`;
    axios
      .post(waitQueueUrl, reqbody, {
        timeout: 30000,
        withCredentials: true,
        headers: {
          "content-type": "text/plain",
        },
      })
      .then((res) => {
        if (res.data?.response_code === "00") {
          alert("Order success! redirecting you to waiting room");
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
  function handleNominal(priceInput) {
    let priceFloat = parseFloat(priceInput);

    return "Rp " + priceFloat.toLocaleString();
  }

  return (
    <div style={{display: "flex", height: 'auto',justifyContent: "space-between", marginLeft: "1rem", marginRight: "1rem", marginTop:"1rem" }}>
      <div style={{width: "50%"}}>
            <Card style={{height: "400px"}}>
              <Card.Body className={styles.eventDetailsBody}>
                <div>
                  <Card.Title>{event.event_name}</Card.Title>
                  <Card.Text>{event.event_desc}</Card.Text>
                  <Card.Text>
                    <b>Ticket Detail</b>
                  </Card.Text>

                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Remaining</th>
                      </tr>
                    </thead>

                    <tbody>
                      {event.event_details != null &&
                        event.event_details.map((ticketType, index) => (
                          <tr key={index}>
                            <td>{ticketType.ticket_class}</td>
                            <td>{handleNominal(ticketType.ticket_price)}</td>
                            <td>{ticketType.ticket_remaining}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
                {showButton && (
                  <Button variant="primary" onClick={handleOrder}>
                    Order
                  </Button>
                )}
              </Card.Body>
            </Card>
      </div>
      <div style={{width: "50%", marginLeft:"1rem"}}>
        <Image
          src={event.event_photo}
          alt=""
          onError={addDefaultSrc}
          style={{
            height: "400px"
          }}
        />
      </div>

        
    </div>
  );
};

export default EventDetailsPage;
