"use client";
import "bootstrap/dist/css/bootstrap.min.css";

import { useState } from "react";
import {
  Form,
  FormControl,
  Button,
  Dropdown,
  Card,
  FormSelect,
} from "react-bootstrap";
import styles from "./events.module.css";
import { useAuthentication } from "../../utils/useAuth";
import { useRouter } from "next/navigation";
import axios from "axios";
const EventPage = () => {
  const [eventName, setEventName] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { push } = useRouter();
  useAuthentication();
  const addDefaultSrc = (ev) => {
    ev.target.src =
      "https://getuikit.com/v2/docs/images/placeholder_600x400.svg";
  };
  const handleSearch = () => {
    axios
      .get(
        `${process.env.SERVER_URL}/api/event?category=${category}&city=${city}&name=${eventName}`,
        {
          timeout: 30000,
          withCredentials: true,
          headers: {
            "content-type": "text/plain",
          },
        }
      )
      .then((response) => {
        setSearchResults(response.data?.data);
      })
      .catch((err) => {
        if (err.code === "ERR_NETWORK") {
          alert("There's problem in server, try again later.");
        } else if (err.response.status == "401") {
          alert("Response not ok, redirecting to login page");
          push("/login");
        } else {
          console.log(err);
          alert("Unknown error occured");
        }
      });
  };

  // Add your search logic here

  return (
    <div>
      <h2>Search Events</h2>
      <div className={styles.searchFormContainer}>
        <Form className={styles.searchForm} inline>
          <FormControl
            type="text"
            placeholder="Event name"
            className="mr-sm-2"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <FormControl
            type="text"
            placeholder="City"
            className="mr-sm-2"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <FormSelect
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="music">Music</option>
            <option value="theater">Theater</option>
          </FormSelect>
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </Form>
      </div>
      <div className="d-flex flex-wrap justify-content-left">
        {searchResults != undefined &&
          searchResults !== null &&
          searchResults.map((item, index) => (
            <div key={index} style={{ flexBasis: "33%", marginBottom: "20px" }}>
              <Card style={{ width: "20rem" }}>
                <Card.Img
                  variant="top"
                  src={item["event_photo"]}
                  style={{
                    width: "20rem",
                    maxHeight: "20rem",
                  }}
                  onError={addDefaultSrc}
                />
                <Card.Body className="d-flex flex-column align-items-center">
                  <Card.Title>{item["event_name"]}</Card.Title>
                  <Button
                    variant="primary"
                    onClick={(e) => {
                      e.preventDefault();
                      push("/events/detail/" + item["event_id"]);
                    }}
                  >
                    More Detail
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EventPage;
