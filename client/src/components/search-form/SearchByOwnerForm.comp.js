import React from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { filterTicketsByOwner } from "../../pages/manage-tickets/ticketsAction";

export const SearchByOwnerForm = () => {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    const { value } = e.target;
    dispatch(filterTicketsByOwner(value));
  };

  return (
    <div>
      <Form>
        <Form.Group as={Row}>
          <Form.Label column sm="3">
            Search By Owner:{""}
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
