import React from "react";
import Table from "react-bootstrap/Table";

const EventTable = ({ events }) => {
  function handleNominal(priceInput) {
    let priceFloat = parseFloat(priceInput);

    return "Rp " + priceFloat.toLocaleString();
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Event Name</th>
          <th>Booking Code</th>
          <th>Booking Status</th>
          <th>Total Price</th>
        </tr>
      </thead>
      <tbody>
        {events != null &&
          events.map((event, index) => (
            <tr key={index}>
              <td>{event.event_name}</td>
              <td>{event.q_unique_code}</td>
              <td>{event.booking_status}</td>
              <td>{handleNominal(event.total_price)}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default EventTable;
