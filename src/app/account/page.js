"use client";
import { useAuthentication } from "@/utils/useAuth";
import { Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
const AccountPage = () => {
  const [userData, setUserData] = useState(null);
  useAuthentication();
  useEffect(() => {
    axios
      .get(`http://localhost:10000/api/user`, {
        timeout: 30000,
        withCredentials: true,
        headers: {
          "content-type": "text/plain",
        },
      })
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.data);
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
  }, []);

  return (
    <div>
      <h2>User Data</h2>
      {userData != null && (
        <Card>
          <Card.Body>
            <Card.Title>User Details</Card.Title>
            <Card.Text>
              <strong>Username:</strong> {userData.user_name}
            </Card.Text>
            <Card.Text>
              <strong>Full Name:</strong> {userData.full_name}
            </Card.Text>
            <Card.Text>
              <strong>Phone:</strong> {userData.phone_number}
            </Card.Text>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AccountPage;
