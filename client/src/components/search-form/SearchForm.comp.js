import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterTicketsBySubject } from "../../pages/manage-tickets/ticketsAction";

export const SearchForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;
    dispatch(filterTicketsBySubject(value));
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Search By Subject:{""}
          </Form.Label>
          <Col sm="9">
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
