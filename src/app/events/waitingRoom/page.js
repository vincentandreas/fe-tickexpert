"use client";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Container, Row, Col, Image, Card, Form, Button, Alert } from 'react-bootstrap';
import { useEffect } from 'react';
import { getCookie, setCookie } from 'cookies-next';

const WaitingRoom = () =>{
   let qcode = getCookie('q_unique_code');
   const { push } = useRouter();

   if (qcode == undefined){
        alert("You dont have unique code!");
        push("/events");
        return;
    }

    async function performLongPolling() {
        try {
            console.log("Posting long poll");
          // const response = await fetch('http://localhost:10000/api/subQueue?timeout=1&category=' + qcode);
          // const data = await response.json();
      
          // if (data['events'] !== "" && data['events']['data'] == 'enter room') {
          //   clearTimeout(pollingTimeout); // Stop the polling
          //   push("events/order");
          //   return;
          // }
      
          // Continue polling
          
        } catch (error) {
          console.log(error);
          // Handle errors
          // ...
        }
      }

    performLongPolling();


    return (<div>
      <p>Waiting Queue ...</p>
      <Image src="loading.gif" />
      
      </div>);
}

export default WaitingRoom;