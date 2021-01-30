const mongoose = require("mongoose");
const validator = require("validator");

const setupSchema = new mongoose.Schema(
  {
    products: {
      type: [String],
    },
    img: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const setup = mongoose.model("Setup", setupSchema);

module.exports = setup;
