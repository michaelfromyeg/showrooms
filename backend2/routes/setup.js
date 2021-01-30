const express = require("express");
const router = express.Router();
const Setup = require("../models/setup");
const mongoose = require("mongoose");
const multer = require("multer");
var path = require("path");
var vision = require("../vision.js");

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
    title: req.body.title || "Untitled",
    description: req.body.description || "No Description",
    tags: req.body.tags || [],
  });
  let results = await vision.getDataFromImage(req.file.filename);
  products = []
  results.labelAnnotations.forEach((product) => {
    products.push(product.description)
  })
  setup.products = products
  const result = await setup.save();
  res.json(result)

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

router.get("/", async (req, res) => {
  const filters = req.query.filters ? JSON.parse(req.query.filters) : null;
  const mongoFilter = {};
  if (filters) {
    for (filter of filters) {
      const entry = Object.entries(filter)[0];
      if (entry[1] !== "") {
        mongoFilter[entry[0]] = entry[1];
      }
    }
  }
  const limit = parseInt(req.query.limit);
  const skip = parseInt(req.query.skip);
  try {
    console.log("mongoFilter", mongoFilter);
    const result = await Setup.find(mongoFilter).skip(skip).limit(limit);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.patch("/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "img",
    "products",
    "upvotes",
    "author",
    "title",
    "tags",
    "description",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const setup = await Setup.findOne({ id: req.params._id });

    if (!setup) {
      return res.status(404).send();
    }

    updates.forEach((update) => (setup[update] = req.body[update]));
    await setup.save();

    res.send(setup);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/:id", async (req, res) => {
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
