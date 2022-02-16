import React, { useState } from "react";
import { LoginForm } from "../../components/login/Login.comp";
import { ResetPassword } from "../../components/password-reset/ResetPassword.comp";
import "./entry.style.css";

const styles = {
  jumbotron: {
    backgroundColor: "white",
    // defines size of area around text
    paddingTop: "4rem",
    paddingBottom: "4rem",
    paddingLeft: "2rem",
    paddingRight: "2rem",
    // rounds the edges
    borderRadius: "0.5rem",
    boxShadow: "0px 0px 15px -7px black",
  },
};

export const Entry = () => {
  const [frmLoad, setFrmLoad] = useState("login");
 
  // form submit handler for ResetPassword component
  const handleOnResetSubmit = (e) => {
    e.preventDefault();
  };

  // frmType parameter is determined by onCLick functions on Login.comp and ResetPassword.comp
  const formSwitcher = frmType => {
    setFrmLoad(frmType);
  }

  if (frmLoad === "login") {
    return (
      <div className="entry-page bg-info">
        <div style={styles.jumbotron}>
          <LoginForm
            formSwitcher={formSwitcher}
          />
        </div>
      </div>
    );
  }

  if (frmLoad === "reset") {
    return (
      <div className="entry-page bg-info">
        <div style={styles.jumbotron}>
          <ResetPassword
            // handleOnChange={handleOnChange}
            handleOnResetSubmit={handleOnResetSubmit}
            formSwitcher={formSwitcher}
            // email={email}
          />
        </div>
      </div>
    );
  }
};
