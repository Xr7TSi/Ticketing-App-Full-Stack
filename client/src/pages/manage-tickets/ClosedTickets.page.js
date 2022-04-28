import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchAllClosedTickets } from "./ticketsAction";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { SearchBySubjectForm } from "../../components/search-form/SearchBySubjectForm.comp";
import { SearchByIdForm } from "../../components/search-form/SearchByIdForm.comp";
import { TicketTable } from "../../components/ticket-table/TicketTable.comp";
import DefaultLayout from "../../components/layout/DefaultLayout";

export const ClosedTickets = () => {
  const dispatch = useDispatch();
  

  useEffect(() => {
    dispatch(fetchAllClosedTickets());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col>
            <PageBreadcrumb page="Closed Tickets " />
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <Link to="/add-ticket">
              <Button variant="primary" style={{ color: "white" }}>
                Add New Ticket
              </Button>
            </Link>
          </Col>
          <Col className="text-right">
            <SearchBySubjectForm />
          </Col>
          <Col className="text-right">
            <SearchByIdForm />
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
