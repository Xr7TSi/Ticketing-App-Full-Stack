import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import crmLogo from "../../../assets/img/crmLogo2.png";
import { Link } from "react-router-dom";


const styles = {
  crmLogo: {
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
    <Navbar collapseOnSelect bg="info" variant="dark" expand="md">
      <Navbar.Brand style={styles.crmLogo}>
        <img src={crmLogo} alt="CRM Logo" width="50px" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Link to="/dashboard" style={styles.linkStyle}>
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
