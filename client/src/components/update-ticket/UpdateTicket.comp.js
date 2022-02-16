import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { replyToTicket } from "../../pages/manage-tickets/ticketsAction";
import PropTypes from "prop-types";

export const UpdateTicket = ({ _id }) => {
  const dispatch = useDispatch();

  // gets user's name from state
  const {
    user: { name },
  } = useSelector((state) => state.user);

  const [message, setMessage] = useState("");

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  // the handleOnSubmit below can be used to prevent submitting reply w/o any text.  Look for a better solution
  
  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  //   const msgObj = {
  //     message,
  //     sender: name,
  //   };
  //   if (message === "") {
  //     alert("Please enter a message.");
  //   } else {
  //     //  _id is imported as a prop from Ticket.page.js
  //     dispatch(replyToTicket(_id, msgObj));
  //     // clear reply field after submit
  //     setMessage("");
  //   }
  // };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const msgObj = {
      message,
      sender: name,
    };
      //  _id is imported as a prop from Ticket.page.js
      dispatch(replyToTicket(_id, msgObj));
      // clear reply field after submit
      setMessage("");
    }
  

  return (
    <div>
      <Form onSubmit={handleOnSubmit}>
        <Form.Label>Reply</Form.Label>
        <div>
          <Form.Text>Add your message here.</Form.Text>
        </div>
        <Form.Control
          value={message}
          onChange={handleOnChange}
          as="textarea"
          row="5"
          name="detail"
        />
        <div className="text-end mt-2 mb-2">
          <Button variant="info" type="submit">
            Reply
          </Button>
        </div>
      </Form>
    </div>
  );
};

UpdateTicket.propTypes = {
  _id: PropTypes.string.isRequired,
};
