const express = require("express");
const router = express.Router();
const {
  insertTicket,
  getAllTickets,
  getAllOpenTickets,
  getAllClosedTickets,
  getTicketsByStatus,
  getTicketsByUserId,
  getTicketById,
  addClientMessage,
  updateStatusClosed,
  deleteTicket,
} = require("../models/ticket/Ticket.model");
const { userAuthorization } = require("../middleware/authorization.middleware");

// consider removing router.all.  may not serve a purpose
router.all("/", (req, res, next) => {
  // res.json({ message: "Ticket Route has been hit" });
  // console.log("Ticket Route has been hit");
  next();
});

// create new ticket
router.post("/", userAuthorization, async (req, res) => {
  try {
    const { subject, sender, message } = req.body;

    // req.userId is a property of the request header
    const userId = req.userId;

    const ticketObj = {
      clientId: userId,
      subject,
      conversations: [
        {
          sender,
          message,
        },
      ],
    };
    const result = await insertTicket(ticketObj);
    if (result._id) {
      res.json({ status: "success", message: "Ticket has been created" });
    }
  } catch (error) {
    console.log("Error at router.post / " + error);
  }
});

// get all tickets 
// this is the V1/ticket/allTickets route
router.get("/all-tickets", userAuthorization, async (req, res) => {
  try {
    const result = await getAllTickets();

    return res.json({ status: "success", result });
  } catch (error) {
    console.log("Error at router.get / " + error);
  }
});

// get all open tickets 
// this is the V1/ticket/all-open-tickets route
router.get("/all-open-tickets", userAuthorization, async (req, res) => {
  try {
 
    const result = await getAllOpenTickets();

    if(result.length) {
      return res.json({ status: "success", result });
    } else {
      return res.json({ status: "failure", message: "No open tickets found" });
    }
   
    
  } catch (error) {
    console.log("Error at router.get / " + error);
  }
});

// get all closed tickets 
// this is the V1/ticket/all-closed-tickets route
router.get("/all-closed-tickets", userAuthorization, async (req, res) => {
  try {
 
    const result = await getAllClosedTickets();

    if(result.length) {
      return res.json({ status: "success", result });
    } else {
      return res.json({ status: "failure", message: "No closed tickets found" });
    }
   
    
  } catch (error) {
    console.log("Error at router.get / " + error);
  }
});

// get tickets by status 
// this is the V1/ticket/tickets-by-status route
router.get("/tickets-by-status", userAuthorization, async (req, res) => {
  try {

    // req.status is a property of the request header
    const status = req.body.status;
   
    const result = await getTicketsByStatus(status);

    if(result.length) {
      return res.json({ status: "success", result });
    } else {
      return res.json({ status: "failure", message: "No tickets found" });
    }
   
    
  } catch (error) {
    console.log("Error at router.get / " + error);
  }
});

// get all tickets for a specific user
// this is the V1/ticket route
router.get("/", userAuthorization, async (req, res) => {
  try {
    // req.userId is a property of the request header
    const userId = req.userId;

    const result = await getTicketsByUserId(userId);

    return res.json({ status: "success", result });
  } catch (error) {
    console.log("Error at router.get / " + error);
  }
});

// get ticket by ticket id (from request parameter) and user id (from request header)
// this is the V1/ticket/:ticketId route
router.get("/:_Id", userAuthorization, async (req, res) => {
  try {
    // _id is an individual ticket id in mongodb
    // req.userId is a property of the request header
    const _id = req.params._Id;
    const clientId = req.userId;

    const result = await getTicketById(_id, clientId);

    return res.json({ status: "success", result });
  } catch (error) {
    console.log("Error at router.get /:_Id " + error);
  }
});

// add a new message to a ticket
// this is the V1/ticket/:ticketId route
router.put("/:_Id", userAuthorization, async (req, res) => {
  try {
    // _id is an individual ticket id in mongodb
    const _id = req.params._Id;
    const clientId = req.userId;
    const { message, sender } = req.body;

    // the clientId parameter ensure only the client can make this change
    const result = await addClientMessage(_id, message, sender, clientId);

    if (result._id) {
      return res.json({
        status: "success",
        message: "Ticket has been updated.",
      });
    }
    res.json({ status: "error", message: "Ticket has not been updated." });
  } catch (error) {
    console.log("Error at router.get /:_Id " + error);
  }
});

// update ticket status to "closed"
// this is the V1/ticket/close-ticket/:ticketId route
router.patch("/close-ticket/:_Id", userAuthorization, async (req, res) => {
  try {
    // _id is an individual ticket id in mongodb

    const _id = req.params._Id;

    const clientId = req.userId;

    // the clientId parameter ensure only the client can make this change
    const result = await updateStatusClosed(_id, clientId);

    if (result._id) {
      return res.json({
        status: "success",
        message: "Ticket status is now closed.",
      });
    }
    res.json({
      status: "error",
      message: "Ticket status has not been updated.",
    });
  } catch (error) {
    console.log("Error at router.patch /close-ticket/:_Id " + error);
  }
});

// delete a ticket by id
// this is the V1/ticket/:ticketId route
router.delete("/:_Id", userAuthorization, async (req, res) => {
  try {
    // _id is an individual ticket id in mongodb
    const _id = req.params._Id;

    const clientId = req.userId;

    // the clientId parameter ensure only the client can make this change
    const result = await deleteTicket(_id, clientId);

      return res.json({
        status: "success",
        message: "Ticket has been deleted.",
      });
  
  } catch (error) {
    console.log("Error at router.delete /:_Id " + error);
  }
});

module.exports = router;
