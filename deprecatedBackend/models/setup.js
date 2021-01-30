const Hapi = require("@hapi/hapi");
const mongoose = require("mongoose");
const validator = require("validator");

const setupSchema = new mongoose.Schema(
  {
    products: {
      type: [String],
    },
    img: { data: Buffer, contentType: String, required: true },
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const setup = mongoose.model("Setup", setupSchema);

module.exports = setup;
