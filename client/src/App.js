import "./App.css";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Entry } from "./pages/entry/Entry.page";
import { PasswordOtpForm } from "./pages/password-reset/passwordOtpForm.page";
import { Dashboard } from "./pages/dashboard/Dashboard.page";
import { AddTicket } from "./pages/new-ticket/AddTicket.page";
import { OpenTickets } from "./pages/manage-tickets/OpenTickets.page";
import { ClosedTickets } from "./pages/manage-tickets/ClosedTickets.page";
import { Ticket } from "./pages/ticket/Ticket.page";
import { Registration } from "./pages/registration/Registration.page";
import { UserVerification } from "./pages/user-verification/UserVerification.page";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "./components/login/loginSlice";
import { fetchNewAccessJWT } from "./api/userAPI";
import { getUserProfile } from "./pages/dashboard/userAction";

function App() {
  const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuth } = useSelector((state) => state.login);
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
      const updateAccessJWT = async () => {
        // get a new accessJWT and assign it to result
        const result = await fetchNewAccessJWT();
        // us there is a result, dispatch loginSuccess whish sets state.isLoading to false and state.isAuth to true
        result && dispatch(loginSuccess());
      };

      // if accessJWT is not in session storage and crmSIte is in local storage, update set new accessJWT to session storage
      if (
        !sessionStorage.getItem("accessJWT") &&
        localStorage.getItem("crmSite")
      ) {
        updateAccessJWT();
      }

      // if isAuth is false, and accessJWT is in session storage (which should be accomplished by fetchNewAccessJWT), dispatch LoginSuccess to set state.isLoading to false and state.isAuth to true
      if (!isAuth && sessionStorage.getItem("accessJWT")) {
        dispatch(loginSuccess());
      }

      // this may not be needed
      // if no user._id in state, dispatch getUserProfile.  getUserProfile awaits fetchUser from userAPI, then dispatches getUserSuccess with user data as a parameter. getUserSuccess adds thr user data to state
      if (!user._id) {
        dispatch(getUserProfile());
      }
    }, [dispatch, isAuth, user._id]);

    // if isAuth is true, render whatever is child of <PrivateRoute>.  otherwise, redirect to "/"
    return isAuth ? children : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/verification/:_id/:email"
            element={<UserVerification />}
          />
          <Route path="/password-reset" element={<PasswordOtpForm />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-ticket"
            element={
              <PrivateRoute>
                <AddTicket />
              </PrivateRoute>
            }
          />
          <Route
            path="/open-tickets"
            element={
              <PrivateRoute>
                <OpenTickets />
              </PrivateRoute>
            }
          />

          <Route
            path="/closed-tickets"
            element={
              <PrivateRoute>
                <ClosedTickets />
              </PrivateRoute>
            }
          />

          <Route
            path="/ticket/:tId"
            element={
              <PrivateRoute>
                <Ticket />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
