import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterTicketsById } from "../../pages/manage-tickets/ticketsAction";

export const SearchByIdForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;
    dispatch(filterTicketsById(value));
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="5">
            Search By Ticket ID:{""}
          </Form.Label>
          <Col sm="7">
            <Form.Control
              name="searchStr"
              type="text"
              placeholder="Search ..."
              onChange={handleOnChange}
            />
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};
