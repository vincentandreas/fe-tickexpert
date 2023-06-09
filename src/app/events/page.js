"use client";
import 'bootstrap/dist/css/bootstrap.min.css'

import React, { useState } from 'react';
import { Form, FormControl, Button, Dropdown, Card, FormSelect } from 'react-bootstrap';
import styles from './events.module.css';
const SearchBar = () => {
    const [eventName, setEventName] = useState('');
    const [city, setCity] = useState('');
    const [category, setCategory] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    
    const handleSearch = () => {
      fetch(`http://localhost:10000/api/event?category=${category}&city=${city}&name=${eventName}`, {
          mode: "cors",
          method: "GET",
          headers: {
            "content-type": "text/plain",
          },
        }).then(response => {  
          return response.json();
        }).then(respJson =>{
          console.log(respJson);
          setSearchResults(respJson['data']);
        })
    };

    // Add your search logic here
    
    return (
      <div>
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
      <div className="d-flex justify-content-around">
        {searchResults !== null &&
          searchResults.map((item, index) => (
            <Card key={index} style={{ width: '18rem' }}>
              <Card.Img
                variant="top"
                src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg"
              />
              <Card.Body>
                <Card.Title>{item['event_name']}</Card.Title>
                <Button variant="primary">See Details</Button>
              </Card.Body>
            </Card>
          ))}
      </div>
    </div>
      
    );
  };
  
  export default SearchBar;
  

//   <div>
//   <Form inline>
//     <FormControl
//       type="text"
//       placeholder="Event name"
//       className="mr-sm-2"
//       value={eventName}
//       onChange={(e) => setEventName(e.target.value)}
//     />
//     <FormControl
//       type="text"
//       placeholder="City"
//       className="mr-sm-2"
//       value={city}
//       onChange={(e) => setCity(e.target.value)}
//     />
//     <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
//       <option value="">Select an option</option>
//       <option value="music">Music</option>
//       <option value="theater">Theater</option>
//     </Form.Select>
    
//     <Button variant="primary" onClick={handleSearch}>
//       Search
//     </Button>
//   </Form>
//   <div className="d-flex justify-content-around">
//   {searchResults != null && searchResults.map((item, index) => (

//     <Card style={{ width: '18rem' }}>
//       <Card.Img variant="top" src="https://getuikit.com/v2/docs/images/placeholder_600x400.svg" />
//       <Card.Body>
//         <Card.Title>{item['event_name']}</Card.Title>
//         <Button variant="primary">
//           See Details
//         </Button>
//       </Card.Body>
//     </Card>

//     ))}
//   </div>
// </div>