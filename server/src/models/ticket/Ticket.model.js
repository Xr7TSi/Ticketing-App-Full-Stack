const { TicketSchema } = require("./Ticket.schema");

const insertTicket = (newTicketObj) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema(newTicketObj)
        .save()
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.save / " + error));
    } catch (error) {
      console.log("Error at insertTicket / " + error);
    }
  });
};

// Get all tickets in order of oldest to newest
// const getAllTickets = () => {
//   return new Promise((resolve, reject) => {
//     try {
//       TicketSchema.find()
//         .then((data) => resolve(data))
//         .catch((error) => reject("Error at TicketSchema.find / " + error));
//     } catch (error) {
//       console.log("Error at getAllTickets / " + error);
//     }
//   });
// };


// Get all tickets in order of newest to oldest
const getAllTickets = () => {
  return new Promise((resolve, reject) => {
    try {
      // opened at -1 orders returned data in descending order (openedAt newest to oldest)
      TicketSchema.find().sort({ openedAt: -1 })
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getAllTickets / " + error);
    }
  });
};



const getAllOpenTickets = () => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find( {status : "open" })
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getAllOpenTickets / " + error);
    }
  });
};

// Get all tickets in order of newest to oldest
const getAllClosedTickets = () => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ status : "closed" }).sort({ openedAt: -1 })
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getAllClosedTickets / " + error);
    }
  });
};

const getTicketsByStatus = (status) => { 
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find( { status: status } )
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getAllOpenTickets / " + error);
    }
  });
};

const getTicketsByUserId = (clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.find({ clientId })
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getTickets / " + error);
    }
  });
};


const getTicketById = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOne({ _id })
        .then((data) => resolve(data))
        .catch((error) => reject("Error at TicketSchema.find / " + error));
    } catch (error) {
      console.log("Error at getTicketById / " + error);
    }
  });
};


const addClientMessage = (_id, message, sender) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          status: "open",
          $push: {
            conversations: { message, sender },
          },
        },
        { new: true }
      )

        .then((data) => resolve(data))
        .catch((error) =>
          reject("Error at TicketSchema.findOneAndUpdate / " + error)
        );
    } catch (error) {
      console.log("Error at addClientMessage / " + error);
    }
  });
};

// const updateStatusClosed = (_id, clientId) => {
//   return new Promise((resolve, reject) => {
//     try {
//       TicketSchema.findOneAndUpdate(
//         { _id, clientId },
//         {
//           status: "closed",
//         },
//         { new: true }
//       )

//         .then((data) => resolve(data))
//         .catch((error) =>
//           reject("Error at TicketSchema.findOneAndUpdate / " + error)
//         );
//     } catch (error) {
//       console.log("Error at updateStatusClosed / " + error);
//     }
//   });
// };

const updateStatusClosed = (_id) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndUpdate(
        { _id },
        {
          status: "closed",
        },
        { new: true }
      )

        .then((data) => resolve(data))
        .catch((error) =>
          reject("Error at TicketSchema.findOneAndUpdate / " + error)
        );
    } catch (error) {
      console.log("Error at updateStatusClosed / " + error);
    }
  });
};


const deleteTicket = (_id, clientId) => {
  return new Promise((resolve, reject) => {
    try {
      TicketSchema.findOneAndDelete({ _id, clientId })
        .then((data) => resolve(data))
        .catch((error) =>
          reject("Error at TicketSchema.findOneAndDelete / " + error)
        );
    } catch (error) {
      console.log("Error at deleteTicket / " + error);
    }
  });
};

module.exports = {
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
};
