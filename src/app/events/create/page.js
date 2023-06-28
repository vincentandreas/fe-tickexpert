"use client";
import {
  Form,
  Dropdown,
  Button,
  Container,
  Row,
  Col,
  Nav,
  FormSelect,
  NavLink,
  Alert,
} from "react-bootstrap";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setCookie } from "cookies-next";
import styles from "./eventcreate.module.css";
import Router from "next/router";

export default function EventCrPage() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [eventDesc, setEventDesc] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [tickets, setTickets] = useState([
    { category: "", price: "", quota: "" },
  ]);
  const [eventCategory, setEventCategory] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const { push } = useRouter();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post(
        "http://localhost:10000/api/upload",

        formData,
        {
          timeout: 30000,
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log("res.data");
        console.log(res.data);

        if (res.data?.response_code === "00") {
          setPhotoUrl(res.data?.data);
          alert("Success upload photo");
        }
      })
      .catch((error) => {
        alert("Failed upload photo, try again later");
        console.error(error);
      });
  };

  const handleCategorySelect = (category) => {
    setEventCategory(category);
  };

  const handleTicketChange = (index, key, value) => {
    const updatedTickets = [...tickets];
    updatedTickets[index][key] = value;
    setTickets(updatedTickets);
  };

  const handleAddTicket = () => {
    setTickets([...tickets, { category: "", price: "", quota: "" }]);
  };

  const handleDeleteTicket = (index) => {
    const updatedTickets = [...tickets];
    updatedTickets.splice(index, 1);
    setTickets(updatedTickets);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const requestBody = {
      event_location: eventLocation,
      event_category: eventCategory, // Replace with the appropriate value
      event_name: eventName,
      event_desc: eventDesc,
      event_photo: photoUrl,
      event_details: tickets.map((ticket) => ({
        ticket_class: ticket.category,
        ticket_price: ticket.price,
        ticket_quota: parseInt(ticket.quota),
      })),
    };

    try {
      const response = axios
        .post("http://localhost:10000/api/event", requestBody, {
          timeout: 30000,
          withCredentials: true,
          headers: {
            "content-type": "text/plain",
          },
        })
        .then((res) => {
          if (res.data?.response_code == "00") {
            alert("Success add event");
            location.reload();
          } else {
            alert(res.data?.response_message);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      console.log(response.data);
      setEventName("");
      setEventDesc("");
      setEventLocation("");
      setTickets([{ category: "", price: "", quota: "" }]);
    } catch (error) {
      console.error(error); // Handle the error
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="eventName" className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventCategory" className="mb-3">
          <Form.Label>Event Category</Form.Label>
          <Form.Select
            value={eventCategory}
            onChange={(e) => handleCategorySelect(e.target.value)}
            required
          >
            <option value="">Select an option</option>
            <option value="music">Music</option>
            <option value="theater">Theater</option>
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="eventDesc" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={eventDesc}
            onChange={(e) => setEventDesc(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="eventLocation" className="mb-3">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Event Photo</Form.Label>
          <Form.Control
            type="file"
            onChange={handleFileChange}
            accept="image/png, image/gif, image/jpeg"
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>

        <Form.Group className="mb-3">
          <Form.Label>Tickets</Form.Label>
          {tickets.map((ticket, index) => (
            <div key={index} className={styles.ticketRow}>
              <Form.Control
                type="text"
                placeholder="Ticket Category"
                value={ticket.category}
                onChange={(e) =>
                  handleTicketChange(index, "category", e.target.value)
                }
                required
              />
              <Form.Control
                type="text"
                placeholder="Ticket Price"
                value={ticket.price}
                onChange={(e) =>
                  handleTicketChange(index, "price", e.target.value)
                }
                required
              />
              <Form.Control
                type="number"
                placeholder="Ticket Quota"
                value={ticket.quota}
                onChange={(e) =>
                  handleTicketChange(index, "quota", e.target.value)
                }
                required
              />
              <Button
                variant="danger"
                onClick={() => handleDeleteTicket(index)}
              >
                Delete
              </Button>
            </div>
          ))}
        </Form.Group>

        <Button variant="secondary" onClick={handleAddTicket} className="mb-3">
          +
        </Button>

        <div className="d-grid">
          <div style={{ width: "150px", margin: "0 auto" }}>
            <Button variant="primary" type="submit">
              Add Event
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
}
