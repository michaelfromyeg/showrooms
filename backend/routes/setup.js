const express = require("express");
const router = express.Router();
const Setup = require("../models/setup");
const User = require("../models/user");

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

router.post("/", upload.single("file"), async (req, res) => {
  // const user = await User.findOne({email: req.body.email})
  // console.log(user, req.body.email)
  
  const setup = new Setup({
    img: req.file.filename,
    title: req.body.title || "Untitled",
    description: req.body.description || "No description.",
    tags: req.body.tags || [],
    by: req.body.by,
    upvotes: 1,
    // author: user.id
  });
  let results = await vision.getDataFromImage(req.file.filename);

  products = []
  results.labelAnnotations.forEach((product) => {
    products.push({ "description": product.description, "location": [] })
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

router.get("/user/:user", async (req, res) => {
  try {
    console.log('GET /user/:user', req.params.user)
    const result = await Setup.find({ by: req.params.user + '@gmail.com' });
    console.log('GET /user/:user', result)
    res.json(result[0]);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:id/image", async (req, res) => {
  const result = await Setup.findById(req.params.id);
  console.log(result);
  res.sendFile(path.resolve("./uploads/" + result.img));
});

router.get("/user/:user/image", async (req, res) => {
  try {
    console.log('GET /user/:user/image', req.params.user)
    const result = await Setup.find({ by: req.params.user + '@gmail.com' });
    console.log('GET /user/:user/image', result);
    res.sendFile(path.resolve("./uploads/" + result.img));
  } catch (err) {
    res.json(err);
  }
});

router.get("/", async (req, res) => {
  const filters = req.query.filters ? JSON.parse(req.query.filters) : null;
  const mongoFilter = {};
  if (filters) {
    for (filter of filters) {
      const entry = Object.entries(filter)[0];
      if (entry[1] !== "") {
        console.log(entry[0])
        if (entry[0] === "author") {
          mongoFilter.by = entry[1] + "@gmail.com";
        } else {
          mongoFilter[entry[0]] = entry[1];
        }
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

router.patch("/test", async (req, res) => {
  res.json(req.boy)
})


router.patch("/:id/products", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "products",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    let setup = await Setup.findById(req.params.id);

    if (!setup) {
      return res.status(404).send();
    }


    const result = await Setup.updateOne({_id: req.params.id}, {
      products: [
        setup.products[0],
        [...setup.products[1], req.body.products]
      ]
    })

     setup = await Setup.findById(req.params.id);

    res.json(setup);
  } catch (e) {
    console.log(e)
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
