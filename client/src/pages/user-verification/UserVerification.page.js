import React, { useEffect, useState } from "react";
import { Spinner, Alert } from "react-bootstrap";
import "./userVerification.style.css";
import { useParams } from "react-router-dom";
import { userRegistrationVerification } from "../../api/userAPI";

const styles = {
  jumbotron: {
    backgroundColor: "white",
    // defines size of area around text
    paddingTop: "4rem",
    paddingBottom: "4rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    // rounds the edges
    borderRadius: "0.5rem",
    boxShadow: "0px 0px 15px -7px black",
  },
};

const initialResponse = {
  status: "",
  message: "",
};

export const UserVerification = () => {
  const { _id, email } = useParams();
  const data = { _id, email };
  const [response, setResponse] = useState(initialResponse);

  useEffect(() => {
    const apiCall = async () => {
      const result = await userRegistrationVerification(data);
      setResponse(result);
    };
    !response.status && apiCall();
  }, [response]);

  return (
    <div className="entry-page bg-info">
      <div style={styles.jumbotron}>
        {/* reminder: the spinner gets stuck if user submits this and is already verified.  Should provide an error */}
        {!response.status && <Spinner variant="info" animation="border" />}
        {response.status && (
          <Alert variant={response.status === "success" ? "success" : "danger"}>
            {response.message}
          </Alert>
        )}
        <div>
          <a href="/" style={{display: 'flex', justifyContent: 'center'}}>Login</a>
        </div>
      </div>
      
    </div>
  );
};
