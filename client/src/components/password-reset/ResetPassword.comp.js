import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import { sendPasswordResetOtp } from "./passwordAction";

export const ResetPassword = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const { isLoading, status, message } = useSelector((state) => state.password);

  const handleOnResetSubmit = (e) => {
    e.preventDefault();
    dispatch(sendPasswordResetOtp(email));
  };

  const handleOnChange = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info">Reset Password</h1>
          {/* hr/ creates horizontal line */}
          <hr />
          {message && (
            <Alert variant={status === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )}
          {isLoading && <Spinner variant="info" animation="border" />}
          <Form autoComplete="off" onSubmit={handleOnResetSubmit}>
            <Form.Group>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                // value is the text displayed in the input field.
                value={email}
                onChange={handleOnChange}
                placeholder="Enter email"
                // required validates input field is in email format
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button style={{ marginTop: "18px" }} type="submit">
                Reset Password
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Row></Row>
    </Container>
  );
};
