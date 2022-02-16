import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { newUserRegistration } from "./userRegistrationAction";
import { useDispatch, useSelector } from "react-redux";

const initialState = {
  name: "",
  phone: "",
  email: "",
  company: "",
  address: "",
  password: "",
  confirmPassword: "",
};

const passwordVerificationError = {
  isLongEnough: false,
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  hasSpecial: false,
  confirmPassword: false,
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passwordVerificationError);

  const { isLoading, status, message } = useSelector(
    (state) => state.registration
  );

  //   re-renders component when newUser receives input
  useEffect(() => {}, [newUser]);

  //   show text in field as text is entered
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });

    if (name === "password") {
      // sets value of each variable to true if the password meets the criteria
      const isLongEnough = value.length >= 8;
      const hasUpperCase = /[A-Z]/.test(value);
      const hasLowerCase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecial =
        /[ !,",#,$,%,&,',(,),*,+,-,.,/,:,;,<,=,>,?,@,[,^,_,`,{,|,} ]/.test(
          value
        );

      setPasswordError({
        ...passwordError,
        isLongEnough,
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasSpecial,
      });
    }
    // when confirm password field receives input, confirmPassword is set to true if newUser.password == the value input into confirm password
    if (name === "confirmPassword") {
      setPasswordError({
        ...passwordError,
        confirmPassword: newUser.password === value,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(newUserRegistration(newUser));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info">User Registration</h1>
        </Col>
      </Row>
      <hr />

      <Row>
        <Col>
          {message && (
            <Alert variant={status === "success" ? "success" : "danger"}>
              {message}
            </Alert>
          )}
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newUser.name}
                onChange={handleOnChange}
                placeholder="Your Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="phoneNumber"
                name="phone"
                value={newUser.phone}
                onChange={handleOnChange}
                placeholder="Phone Number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleOnChange}
                placeholder="Enter Email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={newUser.company}
                onChange={handleOnChange}
                placeholder="Company Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={newUser.address}
                onChange={handleOnChange}
                placeholder="Address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleOnChange}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={newUser.confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
              />
            </Form.Group>

            <ul className="mb-4">
              {/* ternary operators to determine className applied to text */}
              <li
                className={
                  passwordError.isLongEnough ? "text-success" : "text-danger"
                }
              >
                At least 8 characters {""}
                {passwordError.isLongEnough ? <>&#10003;</> : ""}
              </li>
              <li
                className={
                  passwordError.hasUpperCase ? "text-success" : "text-danger"
                }
              >
                At least one upper case letter {""}
                {passwordError.hasUpperCase ? <>&#10003;</> : ""}
              </li>
              <li
                className={
                  passwordError.hasLowerCase ? "text-success" : "text-danger"
                }
              >
                At least one lower case letter {""}
                {passwordError.hasLowerCase ? <>&#10003;</> : ""}
              </li>
              <li
                className={
                  passwordError.hasNumber ? "text-success" : "text-danger"
                }
              >
                At least one number {""}
                {passwordError.hasNumber ? <>&#10003;</> : ""}
              </li>
              <li
                className={
                  passwordError.hasSpecial ? "text-success" : "text-danger"
                }
              >
                At least one special character {""}
                {passwordError.hasSpecial ? <>&#10003;</> : ""}
              </li>

              <li
                className={
                  passwordError.confirmPassword ? "text-success" : "text-danger"
                }
              >
                Passwords match {""}
                {passwordError.confirmPassword ? <>&#10003;</> : ""}
              </li>
            </ul>
            <div className="text-center">
              <Button
                variant="info"
                type="submit"
                disabled={Object.values(passwordError).includes(false)}
              >
                Submit
              </Button>
            </div>

            {isLoading && <Spinner animation="border" variant="info" />}
          </Form>
        </Col>
      </Row>
      <Row className="py-3 text-center">
        <Col>
          Already have an account? {""}
          <a href="/">Login</a>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
