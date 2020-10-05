const express = require("express");
const router = express.Router();
const Showroom = require("../../../models/showroomModel");

router.get("/", async (req, res) => {
  try {
    const showrooms = await Showroom.find({}).select("-__v");
    res.send(showrooms);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/new", async (req, res) => {
  const newShowroom = new Showroom({
    name: req.body.name,
    email: req.body.email,
    address: req.body.address,
  });
  try {
    await newShowroom.save();
    newShowroom.select("-__v");
    res.send({
      data: {
        newShowroom,
      },
      message: "Data has been successfully saved!",
    });
  } catch (e) {}
});

router.post("/updateShowroom/:id", async (req, res) => {
  const showroom = await Showroom.findOne({ _id: req.params.id });
  const { name, email, address } = req.body;
  if (showroom == "" || null) {
    return res.send("Showroom not found!");
  }
  try {
    showroom.name = name;
    showroom.email = email;
    showroom.address = address;
    // showroom.callTracking = callTracking;

    await showroom.save();

    res.send({
      data: showroom,
      message: "Data has been updated!",
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/edit-status/:id", async (req, res) => {
  const showroom = await Showroom.findOne({ _id: req.params.id });
  const { status } = req.body;
  if (showroom == "" || showroom == null) {
    return res.send("Showroom not found!");
  }
  try {
    showroom.status = status;

    await showroom.save();

    res.send({
      data: showroom,
      message: "Data has been updated!",
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const showroom = await Showroom.findOne({ _id: id }).select("-__v");
    if (showroom == "" || null) {
      return res.send(`No Showroom with ${id} exists`);
    }

    res.send(showroom);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
