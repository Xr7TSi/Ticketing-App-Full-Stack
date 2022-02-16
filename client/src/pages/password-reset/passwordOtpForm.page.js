import React from "react";
import { useSelector } from "react-redux";
import { ResetPassword } from "../../components/password-reset/ResetPassword.comp";
import UpdatePasswordForm from "../../components/password-reset/UpdatePasswordForm.comp";
import "./passwordOtpForm.style.css";

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

export const PasswordOtpForm = () => {
  const { showUpdatePasswordForm } = useSelector((state) => state.password);

  return (
    <div className="entry-page bg-info">
      <div style={styles.jumbotron}>
        {showUpdatePasswordForm ? <UpdatePasswordForm /> : <ResetPassword />}
      </div>
    </div>
  );
};
