import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { subjectText } from "../../utils/validation.js";
import { openNewTicket } from "./addTicketAction";
import { resetSuccessMsg } from "./addTicketSlice";

const styles = {
  jumbotron: {
    backgroundColor: "white",
    paddingTop: "4rem",
    paddingBottom: "4rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    borderRadius: "0.5rem",
    boxShadow: "0px 0px 15px -7px black",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

const initialFormData = {
  subject: "",
  issueDate: "",
  message: "",
};

// used for field validation
const initialFormDataError = {
  subject: false,
  issueDate: false,
  message: false,
};

export const AddTicketForm = () => {
  const dispatch = useDispatch();

  const {
    user: { name },
  } = useSelector((state) => state.user);

  const { isLoading, error, successMsg } = useSelector(
    (state) => state.openTickets
  );

  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState(initialFormDataError);

  // is successMsg is present, reset to empty string on load
  useEffect(() => {

    if(successMsg) {
      dispatch(resetSuccessMsg());
    }
  }, [ dispatch, formData, formDataError]);


  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setFormDataError(initialFormDataError);
   
    const isSubjectValid = await subjectText(formData.subject);

    setFormDataError({
      ...initialFormDataError,
      subject: !isSubjectValid,
    });

    dispatch(openNewTicket({ ...formData, sender: name }));
  };

  return (
    <div style={styles.jumbotron}>
      <h1 className="text-info text-center">Add a New Ticket</h1>
      <hr />
      <div>
        {error && <Alert variant="danger">{error}</Alert>}
        {successMsg && <Alert variant="info">{successMsg}</Alert>}
        {isLoading && <Spinner variant="info" animation="border" />}
      </div>
      <Form autoComplete="off" onSubmit={handleOnSubmit}>
        <Form.Group as={Row}>
          <Form.Label column sm={3}>
            Subject
          </Form.Label>
          <Col>
            <Form.Control
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleOnChange}
              placeholder="Subject"
              required
            />
            <Form.Text className="text-danger">
              {formDataError.subject && "Subject is required."}
            </Form.Text>
          </Col>
        </Form.Group>
        {/* consider removing the date field.  this should probably populate the db automatically */}
        <Form.Group as={Row} style={{ marginTop: "10px" }}>
          <Form.Label column sm={3}>
            Date
          </Form.Label>
          <Col>
            <Form.Control
              type="date"
              value={formData.date}
              name="issueDate"
              onChange={handleOnChange}
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} style={{ marginTop: "10px" }}>
          <Form.Label column sm={3}>
            Issue Found
          </Form.Label>
          <Col>
            <Form.Control
              as="textarea"
              value={formData.message}
              name="message"
              rows="5"
              onChange={handleOnChange}
              required
            />
            <Form.Text className="text-danger">
              {formDataError.message && "Subject details are required."}
            </Form.Text>
          </Col>
        </Form.Group>

        <Button
          style={{ marginTop: "18px", color: "white", width: "100%" }}
          type="submit"
          variant="info"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

