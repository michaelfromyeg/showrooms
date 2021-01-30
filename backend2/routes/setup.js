const express = require("express");
const router = express.Router();
const Setup = require("../models/Setup");
const mongoose = require("mongoose");
const multer = require("multer");
var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

var upload = multer({
  storage,
});

/* POST setup listing. POST localhost:3000/setup */
router.post("/", upload.single("file"), async (req, res) => {
  const setup = new Setup({
    img: req.file.filename,
  });
  const result = await setup.save();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  try {
    const result = await Setup.findById(req.params.id);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id/image", async (req, res) => {
  const result = await Setup.findById(req.params.id);
  console.log(result);
  res.sendFile(path.resolve("./uploads/" + result.img));
});

router.get("/:id", async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// TODO wack filtering
router.get("/", async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send();
  }
});

// TODO update list of products
router.patch("/setup/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["products"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const setup = await Set.findOne({ _id: req.params.id });

    if (!setup) {
      return res.status(404).send();
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();

    res.send(setup);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/setup/:id", async (req, res) => {
  try {
    const setup = await Setup.findOneAndDelete({
      _id: req.params.id,
    });

    if (!setup) {
      res.status(404).send();
    }

    res.send(setup);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
