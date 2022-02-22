import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DashboardTable } from "../../components/dashboard-table/DashboardTable.comp";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { fetchAllTickets } from "../manage-tickets/ticketsAction";
import DefaultLayout from "../../components/layout/DefaultLayout";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);
  const totalTickets = tickets.length;
  const openTickets = tickets.filter((ticket) => ticket.status === "open");
  
  
  

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
            <h4>
            <div>Open Tickets: {openTickets.length}</div>
            </h4>
            
            <div>Total Tickets: {totalTickets}</div>
          </Col>
        </Row>

        <Row>
          <Col className="mt-2">
            <h5>Recently Added Tickets</h5>
          </Col>
        </Row>
        <hr />

        <Row>
          <Col className="recent-ticket">
            <DashboardTable tickets={tickets} />
  
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};
