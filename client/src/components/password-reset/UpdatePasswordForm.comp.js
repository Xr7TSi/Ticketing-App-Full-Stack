import React, { useState, useEffect } from "react";
import { updatePassword } from "./passwordAction";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";

const initialState = {
  pin: "",
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

const UpdatePasswordForm = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = useState(initialState);
  const [passwordError, setPasswordError] = useState(passwordVerificationError);

  const { isLoading, status, message, email } = useSelector(
    (state) => state.password
  );

  //   re-renders component when newPassword receives input
  useEffect(() => {}, [newPassword]);

  //   show text in field as text is entered
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });

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
        confirmPassword: newPassword.password === value,
      });
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { pin, password } = newPassword;
    const newPasswordObj = {
      pin,
      newPassword: password,
      email,
    };
    dispatch(updatePassword(newPasswordObj));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info">Update Password</h1>
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
          {isLoading && <Spinner variant="info" animation="border" />}
        </Col>
      </Row>

      <Row>
        <Col>
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>PIN</Form.Label>
              <Form.Control
                type="number"
                name="pin"
                value={newPassword.pin}
                onChange={handleOnChange}
                placeholder="pin"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newPassword.password}
                onChange={handleOnChange}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                value={newPassword.confirmPassword}
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
          </Form>
        </Col>
      </Row>
      <Row className="py-3">
        <Col className="text-center">
          <a href="/">Login</a>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePasswordForm;
