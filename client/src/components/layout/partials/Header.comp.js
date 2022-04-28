import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const styles = {
  logo: {
    marginLeft: "8px",
    paddingTop: ".5rem",
    paddingBottom: ".5rem",
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
    borderRadius: "0.1rem",
    boxShadow: "0px 0px 15px -7px black",
  },
  linkStyle: {
    color: "white",
    textDecoration: "none",
    marginLeft: "10px",
    marginRight: "10px",
  },
};

export const Header = () => {
  const logMeOut = () => {
    // crmSite is refreshJWT in local storage
    localStorage.removeItem("crmSite");
    sessionStorage.removeItem("accessJWT");
  };

  return (
    <Navbar collapseOnSelect bg="dark" variant="dark" expand="md">
      <Navbar.Brand style={styles.logo}>
        <h2>Ticket Tracker</h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={styles.linkPosition}>
          <Link
            to="/dashboard"
            style={styles.linkStyle}
            onClick="window.location.reload"
          >
            Dashboard
          </Link>

          <Link to="/add-ticket" style={styles.linkStyle}>
            Add Ticket
          </Link>

          <Link to="/open-tickets" style={styles.linkStyle}>
            Open Tickets
          </Link>

          <Link to="/closed-tickets" style={styles.linkStyle}>
            Closed Tickets
          </Link>

          <Link to="/" onClick={logMeOut} style={styles.linkStyle}>
            Logout
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
