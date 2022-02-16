import React, { useState, useEffect } from "react";
// PropTypes is used to validate the props that are passed to the component.  See rules at bottom of this file
import PropTypes from "prop-types";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { loginPending, loginSuccess, loginFail } from "./loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../pages/dashboard/userAction";

export const LoginForm = ({ formSwitcher }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isLoading, isAuth, error } = useSelector((state) => state.login);
  const navigate = useNavigate();

  // if accessJWT is in session storage, redirect to dashboard because user is already logged in, login page isn't needed
  useEffect(() => {
    // sessionStorage is not persisting when a new tab is opened along with the current tab.  This is unexpected.
    sessionStorage.getItem("accessJWT") && navigate("/dashboard");
  }, [navigate, isAuth]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    // switch statement updates the email value on the form on Login.comp.js each time text is entered
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  // form submit handler for Login component
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Please enter your email address.");
    }
    dispatch(loginPending());

    try {
      const isAuth = await userLogin({ email, password });
      if (isAuth.status === "error") {
        return dispatch(loginFail(isAuth.message));
      }
      dispatch(loginSuccess());
      dispatch(getUserProfile());
      navigate("/dashboard");
    } catch (error) {
      dispatch(loginFail(error));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-info">Client Login</h1>
          {/* hr/ creates horizontal line */}
          <hr />
          {error && <Alert variant="danger">{error}</Alert>}
          <Form autoComplete="off" onSubmit={handleOnSubmit}>
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
            <Form.Group style={{ marginTop: "10px" }}>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                required
              />
            </Form.Group>
            <div className="text-center">
            <Button style={{ marginTop: "18px" }} type="submit">
              Login
            </Button>
            </div>
            
            {isLoading && <Spinner variant="info" animation="border" />}
          </Form>
          <hr />
        </Col>
      </Row>
      <Row >
        <Col className="text-center" >
          <a href="/password-reset">
            Forgot Password?
          </a>
        </Col>
      </Row>
      <Row>
      <Col className="py-4 text-center">
        First time here? { " "} 
          <a href="/registration" onClick={() => formSwitcher("reset")}>
            Sign Up
          </a>
        </Col>
      </Row>
    </Container>
  );
};

LoginForm.propTypes = {
  formSwitcher: PropTypes.func.isRequired,
};
