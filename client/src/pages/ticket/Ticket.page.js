import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Button, Spinner, Alert } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { MessageHistory } from "../../components/message-history/MessageHistory.comp";
import { UpdateTicket } from "../../components/update-ticket/UpdateTicket.comp";
import DefaultLayout from "../../components/layout/DefaultLayout";
import { useParams } from "react-router-dom";
import { fetchSingleTicket, closeTicket } from "../manage-tickets/ticketsAction";
import { resetReplyMsg } from "../manage-tickets/ticketSlice";

export const Ticket = () => {

  // tId is the parameter used in the "/ticket/:tId" route in app.js
  const { tId } = useParams();
  const dispatch = useDispatch();
  const { isLoading, error, selectedTicket, replyMsg, replyTicketError } = useSelector((state) => state.tickets);
 
  
  
  useEffect(() => {
    // fetches ticket for display on page
    dispatch(fetchSingleTicket(tId));
    // is successMsg is present, reset to empty string
    if(replyMsg) {
      dispatch(resetReplyMsg());
    }
  }, [tId, dispatch]);

  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col>
            <PageBreadcrumb page="Ticket Search" />
          </Col>
        </Row>
        <Row>
          <Col>
            {isLoading &&<Spinner variant="info" animation="border" />}
            {error &&<Alert variant="danger">{error}</Alert>}
            {replyTicketError &&<Alert variant="danger">{replyTicketError}</Alert>}
            {replyMsg && <Alert variant="success">{replyMsg}</Alert>}
          </Col>
        </Row>
        <Row>
          <Col className="text-secondary">
            <div className="subject">Subject: {selectedTicket.subject}</div>
            {/* if there is selectedTicket.openedAt, convert it to readable date */}
            <div className="date">Ticket Opened: {selectedTicket.openedAt && new Date
            (selectedTicket.openedAt).toLocaleString()}</div>
            <div className="status">Status: {selectedTicket.status}</div>
          </Col>
          <Col className="text-right">
            <Button 
            variant="outline-info" 
            onClick={() => dispatch(closeTicket(tId))}
            disabled={selectedTicket.status === "closed"}
            >Close Ticket</Button>
          </Col>
        </Row>
        <Row className="mt-4">
          {/* conditional rendering of ticket history prevents error in console if history is not present */}
          <Col>{selectedTicket.conversations && <MessageHistory msg={selectedTicket.conversations} />}</Col>
        </Row>
        <hr />
        <Row className="mt-4">
          <Col>
          {/* _id is passed to UpdateTicket.comp */}
            <UpdateTicket _id={tId}
            />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};
