import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PageBreadcrumb } from "../../components/breadcrumb/Breadcrumb.comp";
import { AddTicketForm } from "../../components/add-ticket-form/AddTicketForm.comp";
import DefaultLayout from "../../components/layout/DefaultLayout";


export const AddTicket = () => {
  
  return (
    <DefaultLayout>
      <Container>
        <Row>
          <Col>
            <PageBreadcrumb page="Add Ticket" />
          </Col>
        </Row>

        <Row>
          <Col>
            <AddTicketForm />
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};
