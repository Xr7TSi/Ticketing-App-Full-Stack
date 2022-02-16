import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { fetchAllTickets } from "../manage-tickets/ticketsAction";
import DefaultLayout from "../../components/layout/DefaultLayout";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  console.log(tickets);
  const totalTickets = tickets.length;

  // if no tickets are present in state, fetch them
  useEffect(() => {
    if (!tickets.length) {
      dispatch(fetchAllTickets());
    }
  }, [tickets, dispatch]);

  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col>
            <PageBreadcrumb page="Dashboard" />
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-5 mb-2">
            <Link to="/add-ticket">
              <Button
                variant="info"
                style={{
                  fontSize: "2rem",
                  padding: "10px 30px",
                  color: "white",
                }}
              >
                Add New Ticket
              </Button>
            </Link>
          </Col>
        </Row>

        <Row>
          <Col className="text-center mb-2">
            <div>Total Tickets: {totalTickets}</div>
            <div>Open Tickets: {tickets.length}</div>
          </Col>
        </Row>

        <Row>
          <Col className="mt-2">Recently Added Tickets</Col>
        </Row>
        <hr />

        <Row>
          <Col className="recent-ticket">
            <TicketTable tickets={tickets} />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};
