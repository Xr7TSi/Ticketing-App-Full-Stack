import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllTickets } from "./ticketsAction";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { SearchForm } from "../../components/search-form/SearchForm.comp";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import DefaultLayout from "../../components/layout/DefaultLayout";

export const TicketList = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchAllTickets());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col>
            <PageBreadcrumb page="Manage Tickets " />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/add-ticket">
              <Button variant="info" style={{ color: "white" }}>
                Add New Ticket
              </Button>
            </Link>
          </Col>
          <Col className="text-right">
            <SearchForm />
          </Col>
        </Row>
        <hr />
        <Col>
          <TicketTable />
        </Col>
      </Container>
    </DefaultLayout>
  );
};
