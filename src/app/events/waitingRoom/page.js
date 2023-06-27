"use client";
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
import { getCookie, setCookie } from "cookies-next";
import { useAuthentication } from "@/utils/useAuth";

const WaitingRoom = () => {
  useAuthentication();
  let qcode = getCookie("q_unique_code");
  let eventId = getCookie("event_id");
  const [queueLength, setQueueLength] = useState(0);

  const { push } = useRouter();

  if (qcode == undefined || eventId == undefined) {
    alert("You need to choose the event first!");
    push("/");
    return;
  }
  let chckLgthTimeout;
  function performCheckAvail() {
    console.log("performCheckAvail running ...");
    try {
      let url =
        "http://localhost:10000/api/subQueue?timeout=50&category=" + qcode;
      fetch(url, {
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
          if (
            data != undefined &&
            data.events != undefined &&
            data.events.length > 0 &&
            data.events[0].data == "enter room"
          ) {
            clearTimeout(chckLgthTimeout); // Stop the polling
            push("events/order/");
            return;
          }
        });
      chckLgthTimeout = setTimeout(performCheckAvail, 51000);
    } catch (error) {
      console.log(error);
    }
  }

  function performCheckLength() {
    try {
      let url = "http://localhost:10000/api/waitingQueue/checkTotal/" + eventId;
      fetch(url, {
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
          if (data != undefined && data.data != undefined && data.data === 0) {
            clearTimeout(chckLgthTimeout); // Stop the polling
            push("events/order/");
            return;
          }
          setQueueLength(data.data);
        });
      chckLgthTimeout = setTimeout(performCheckLength, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  function startPool() {
    performCheckAvail();
    performCheckLength();
  }

  startPool();

  return (
    <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
      <h2>Waiting Queue ...</h2>
      <p>Currently there are {queueLength} people waiting</p>
      <Image src="../loading.gif" />
    </div>
  );
};

export default WaitingRoom;
