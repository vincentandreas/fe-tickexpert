"use client";
import 'bootstrap/dist/css/bootstrap.min.css'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Row, Col, Image, Card, Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

const EventDetailsPage = ({params}) => {
  let eventId = params.eventId;
  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const { push } = useRouter();

  useEffect(() => {
    if(eventId){  
        fetch('http://localhost:10000/api/event/'+eventId,{
          mode: "cors",
          method: "GET",
          credentials: 'include',
          headers: {
            "content-type": "text/plain",
          },
        })
        .then((response) => response.json())
        .then((data) => setEvent(data['data']))
        .catch((error) => console.log(error));
    }
  }, [eventId]);


  // "user_id": 1,
  // "event_id": 1,
  // "q_unique_code":"bfff7866-de2b-4be8-ac9f-e8437da12de7",
  // "booking_status": "active",
  // "booking_details": [
  //     {
  //         "price": "15007",
  //         "qty": 1,
  //         "event_detail_id": 3
  //     }
  // ]

  let qcode = getCookie('q_unique_code');
  
  const handleOrder = () => {
    var reqJson = JSON.stringify({
      event_id : parseInt(eventId),
    })
    console.log(reqJson);
    fetch("http://localhost:10000/api/waitingQueue", {
      method: "POST",
      credentials: 'include',
      body: reqJson,
      headers: {
        "content-type": "text/plain",
      },
    }).then(response => {
      return response.json();
    }).then(respJson =>{
      console.log(respJson);
      if(respJson['response_code'] == "00"){
        setCookie("q_unique_code", respJson['data']['q_unique_code']);
        push("events/waitingRoom");
      }
    })
  };

  if (!event) {
    return <p>Loading event details...</p>;
  }

  return (
    <div>
      {showAlert && (
      <Alert variant="success" style={{ width: "42rem" }}>
        <Alert.Heading>
          Login success
        </Alert.Heading>
      </Alert>
    )}
    <Container className="mt-5">
      <Row>
        {/* <Col>
          <Image src={event.imageUrl} fluid />
        </Col> */}
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>{event.event_name}</Card.Title>
              <Card.Text>lorem ipsum</Card.Text>
              {event.event_details != null && event.event_details.map((ticketType, index) => (
              <div key={index}>
                <p>{ticketType.ticket_class} Rp {ticketType.ticket_price}</p>
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