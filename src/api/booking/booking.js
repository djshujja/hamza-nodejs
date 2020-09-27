const express = require("express");
// const { model } = require("../../models/bookingModel");
const router = express.Router();

const Booking = require("../../models/bookingModel");

router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("car", "_id name").exec();

    res.send(bookings);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/new", async (req, res) => {
  //finds the last record
  const lastBooking = await Booking.findOne().sort({
    field: "asc",
    booking_id: -1,
  });

  //selects its id
  const lastId = lastBooking.booking_id;

  //increments the last id
  let newId = lastId + 1;

  const newBooking = new Booking({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNo: req.body.phoneNo,
    emailAddress: req.body.emailAddress,
    takenTime: req.body.takenTime,
    returnTime: req.body.returnTime,
    booking_id: newId,
    car: req.body.car,
  });
  try {
    const savedBooking = await newBooking.save();
    res.send(savedBooking);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:bookID", async (req, res) => {
  const id = req.params.bookID;
  const booking = await Booking.find({
    booking_id: id,
  })
    .populate("car")
    .exec();

  try {
    if (booking == "" || null) {
      return res.status(404).send({
        message: `No booking with ${id} is found`,
      });
    }
    res.send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:bookID", async (req, res) => {
  const id = req.params.bookID;
  const booking = await Booking.findOne({ booking_id: id });

  if (booking == null || "") {
    return res.status(404).send({
      message: `No booking with ${id} is found`,
    });
  }

  try {
    booking.isPending = req.body.isPending;
    booking.save();
    res.send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/:bookID", async (req, res) => {
  const id = req.params.bookID;
  const booking = await Booking.findOne({ booking_id: id });

  if (booking == null || "") {
    return res.status(404).send({
      message: `No booking with ${id} is found`,
    });
  }

  try {
    await booking.delete();
    res.json({
      data: booking,
      message: "Deleted Successfully",
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
