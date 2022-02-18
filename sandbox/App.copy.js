import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Entry } from "../src/pages/entry/Entry.page";
import { Dashboard } from "../src/pages/dashboard/Dashboard.page";
import { AddTicket } from "../src/pages/new-ticket/AddTicket.page";
import { TicketList } from "../src/pages/ticket-list/TicketList.page";
import { Ticket } from "../src/pages/ticket/Ticket.page";
import { useSelector } from "react-redux";



function App() {

  const {isAuth} = useSelector(state => state.login);


  if (isAuth == true)

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Entry />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-ticket" element={<AddTicket />} />
          <Route path="/tickets" element={<TicketList />} />
          <Route path="/ticket/:tId" element={<Ticket />} />
        </Routes>
      </Router>
    </div>
  )

  if (isAuth === false)
 
// if isAuth is false, all routes direct to the login page
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<Entry />} />
        <Route path="/dashboard" element={<Entry />} />
          <Route path="/add-ticket" element={<Entry />} />
          <Route path="/tickets" element={<Entry />} />
          <Route path="/ticket/:tId" element={<Entry />} />
      </Routes>
    </Router>
  </div>
  )
}

export default App;