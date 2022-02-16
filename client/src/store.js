import { configureStore } from "@reduxjs/toolkit";
import ticketsReducer from "./pages/manage-tickets/ticketSlice";
import loginReducer from "./components/login/loginSlice";
import userReducer from "./pages/dashboard/userSlice";
import newTicketReducer from './components/add-ticket-form/addTicketSlice'
import registrationReducer from "./components/registration-form/userRegistrationSlice";
import passwordReducer from "./components/password-reset/passwordSlice";

const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    login: loginReducer,
    user: userReducer,
    openTickets: newTicketReducer,
    registration: registrationReducer,
    password: passwordReducer,
  },
});

export default store;
