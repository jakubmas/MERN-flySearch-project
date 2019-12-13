const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const TicketSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  outobundCarriageLogo: {
    type: String,
  },
  outboundCarriageName: {
    type: String,
  },
  outboundDeparturePlace: {
    type: String,
  },
  outboundDepartureDate: {
    type: String,
  },
  outboundDuration: {
    type: String,
  },
  outboundDestinationPlace: {
    type: String,
  },
  outboundArrivalDate: {
    type: String,
  },
  inboundCarriageLogo: {
    type: String,
  },
  inboundCarriageName: {
    type: String,
  },
  inboundDeparturePlace: {
    type: String,
  },
  inboundDepartureDate: {
    type: String,
  },
  inboundDuration: {
    type: String,
  },
  inboundDestinationPlace: {
    type: String,
  },
  inboundArrivalDate: {
    type: String,
  },
  payments: {
    type: Array,
  },
});

module.exports = Ticket = mongoose.model("ticket", TicketSchema);
