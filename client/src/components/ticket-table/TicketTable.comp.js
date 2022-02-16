import React from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

export const TicketTable = () => {
  const { searchTicketList, tickets, isLoading, error } = useSelector(
    (state) => state.tickets
  );

  if (isLoading) return <h3>Loading...</h3>;

  if (error) return <h3>Error: {error}</h3>;

  return (
    <Table striped bordered hover>
      {/* <thead? groups header content in the table */}
      <thead>
        {/* <tr>defines a row of cells in the table */}
        <tr>
          {/* <th> defines the header cells in the table */}
          <th>#</th>
          <th>Subject</th>
          <th>Status</th>
          <th>Opened Date</th>
        </tr>
      </thead>
      <tbody>
        {/* ternary operator is used to populate table with No Tickets Exist message if there are not tickets */}
        {tickets.length ? (
          searchTicketList.map((row) => (
            <tr key={row._id}>
              <td>{row._id}</td>
              <td>
                {/* the link below adds the selected ticket's id as a parameter to the /tickets:tId route */}
                <Link to={`/ticket/${row._id}`}>{row.subject}</Link>
              </td>
              <td>{row.status}</td>
              <td>{row.openedAt && new Date(row.openedAt).toLocaleString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              No Tickets Exist
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};
