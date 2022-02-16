const mongoose = require("mongoose");
const { stringify } = require("nodemon/lib/utils");
const Schema = mongoose.Schema;

const TicketSchema = new Schema({
  clientId: {
    type: Schema.Types.ObjectId,
  },
  subject: {
    type: String,
    maxLength: 100,
    required: true,
    default: "",
  },
  openedAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    maxLength: 100,
    required: true,
    default: "open",
  },
  conversations: [
    {
      sender: {
        type: String,
        maxLength: 100,
        required: true,
        default: "",
      },
      message: {
        type: String,
        maxLength: 1500,
        required: true,
        default: "",
      },
      msgAt: {
        type: Date,
        required: true,
        default: Date.now(),
      }
    },
  ],
});

module.exports = {
  // "Ticket" creates the mongoDb table "tickets"
  TicketSchema: mongoose.model("Ticket", TicketSchema),
};
