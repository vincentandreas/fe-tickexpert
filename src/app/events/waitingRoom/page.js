"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Row, Col, Image, Card, Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';
import { useAuthentication } from '@/utils/useAuth';
import MyNavbar from '@/components/navbar';

const WaitingRoom = () => {
  useAuthentication();
  let qcode = getCookie('q_unique_code');
  const { push } = useRouter();

  if (qcode == undefined) {
    alert("You dont have unique code!");
    push("/events");
    return;
  }
  let pollingTimeout;
  function performLongPolling() {
    try {
      console.log("Posting long poll");
      let url = 'http://localhost:10000/api/subQueue?timeout=50&category=' + qcode;
      fetch(url, {
        mode: "cors",
        method: "GET",
        credentials: 'include',
        headers: {
          "content-type": "text/plain",
        },
      }).then(response =>{
        console.log("isi resp");
        console.log(response);
        return response.json()
      }).then(data => {
        console.log("Isi data:::");
        console.log(data);
        if (data != undefined && data.events != undefined   && data.events.length >0 && data.events[0].data == 'enter room') {
          console.log("already enter the room");
          clearTimeout(pollingTimeout); // Stop the polling
          push("events/order/" );
          return;
        }
      });
      console.log("before set TO");
      // Continue polling
      pollingTimeout = setTimeout(performLongPolling, 51000);
      console.log("after set TO");

    } catch (error) {
      console.log(error);
      // Handle errors
      // ...
    }
  }

  function startPool(){
    performLongPolling();
  }

  startPool();

  return (<div>
    <MyNavbar />
    <p>Waiting Queue ...</p>
    <Image src="loading.gif" />

  </div>);
}

export default WaitingRoom;