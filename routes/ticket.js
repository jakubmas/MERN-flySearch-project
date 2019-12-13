const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require("../middleware/auth");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

//@route    POST api/ticket
//@desc     Add selected ticket to DB
//@access   Private
router.post("/", auth, async (req, res) => {
  try {
    const newTicket = new Ticket({
      outobundCarriageLogo: req.body.outobundCarriageLogo,
      outboundCarriageName: req.body.outboundCarriageName,
      outboundDeparturePlace: req.body.outboundDeparturePlace,
      outboundDepartureDate: req.body.outboundDepartureDate,
      outboundDuration: req.body.outboundDuration,
      outboundDestinationPlace: req.body.outboundDestinationPlace,
      outboundArrivalDate: req.body.outboundArrivalDate,
      inboundCarriageLogo: req.body.inboundCarriageLogo,
      inboundCarriageName: req.body.inboundCarriageName,
      inboundDeparturePlace: req.body.inboundDeparturePlace,
      inboundDepartureDate: req.body.inboundDepartureDate,
      inboundDuration: req.body.inboundDuration,
      inboundDestinationPlace: req.body.inboundDestinationPlace,
      inboundArrivalDate: req.body.inboundArrivalDate,
      payments: req.body.payments,
      user: req.user.id,
    });
    if (
      await Ticket.findOne({
        outobundCarriageLogo: req.body.outobundCarriageLogo,
        outboundCarriageName: req.body.outboundCarriageName,
        outboundDeparturePlace: req.body.outboundDeparturePlace,
        outboundDepartureDate: req.body.outboundDepartureDate,
        outboundDuration: req.body.outboundDuration,
        outboundDestinationPlace: req.body.outboundDestinationPlace,
        outboundArrivalDate: req.body.outboundArrivalDate,
        inboundCarriageLogo: req.body.inboundCarriageLogo,
        inboundCarriageName: req.body.inboundCarriageName,
        inboundDeparturePlace: req.body.inboundDeparturePlace,
        inboundDepartureDate: req.body.inboundDepartureDate,
        inboundDuration: req.body.inboundDuration,
        inboundDestinationPlace: req.body.inboundDestinationPlace,
        inboundArrivalDate: req.body.inboundArrivalDate,
        payments: req.body.payments,
        user: req.user.id,
      })
    ) {
      res.json("You already saved this ticket");
    } else {
      await newTicket.save();
      res.json("Ticket saved");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route    GET api/ticket
//@desc     Get curent users tickets
//@access   Private
router.get("/", auth, async (req, res) => {
  try {
    const tickets = await Ticket.find({user: req.user.id});

    if (!tickets) {
      return res.status(400).json({msg: "There are no tickets for this user"});
    }
    res.json(tickets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

//@route    DELETE api/ticket/:ticket_id
//@desc     Delete a ticket
//@access   Private
router.delete("/:ticket_id", auth, async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.ticket_id);
    if (!ticket) {
      return res.status(404).json({msg: "Post not found!"});
    } else if (req.user.id !== ticket.user.toString()) {
      return res.status(404).json({msg: "Can't perform this action"});
    }
    await Ticket.findOneAndRemove({_id: req.params.ticket_id});
    res.json({msg: "Ticket Deleted"});
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({msg: "post not found"});
    }
    res.status(500).send("server error");
  }
});
module.exports = router;
