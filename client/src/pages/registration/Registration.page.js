import React from 'react';
import RegistrationForm from '../../components/registration-form/RegistrationForm.comp';
import "./registration.style.css";

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

export const Registration = () => {
  return  <div className="entry-page bg-info">
  <div style={styles.jumbotron}>
   <RegistrationForm />
  </div>
</div>
}


