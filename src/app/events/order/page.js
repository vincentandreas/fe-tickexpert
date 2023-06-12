"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Row, Col, Image, Card, Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';

const OrderRoom = ({params}) => {
  const {router, query, isR} = useRouter();
  let eventId = params.eventId;
  const [event, setEvent] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if(eventId){  
        fetch('http://localhost:10000/api/event/'+eventId)
        .then((response) => response.json())
        .then((data) => setEvent(data['data']))
        .catch((error) => console.log(error));
    }
  }, [eventId]);

  const handleQuantityChange = (index, value) => {
    setQuantities((prevQuantities) => {
      const newQuantities = [...prevQuantities];
      newQuantities[index] = value;
      return newQuantities;
    });
  };

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
      event_id : eventId,
      q_unique_code : qcode,
    //   booking_details:
    })
    console.log(reqJson);
    fetch("http://localhost:10000/api/book", {
      method: "POST",
      credentials: 'include',
      body: reqJson,
      headers: {
        "content-type": "text/plain",
      },
    }).then(response => {
      return response.json();
    }).then(respJson =>{
      if(respJson['response_code'] == "00"){
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          push("/events");
        }, 1000);
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
              <Form>
              {event.event_details != null && event.event_details.map((ticketType, index) => (
                  <Form.Group controlId={`formQuantity-${index}`} key={index}>
                    <Form.Label>{ticketType.ticket_class} Rp {ticketType.ticket_price}</Form.Label>
                    <Form.Control
                      type="number"
                      min={1}
                      value={quantities[index]}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </Form.Group>
                ))}
                <Button variant="primary" onClick={handleOrder}>
                  Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default OrderRoom;