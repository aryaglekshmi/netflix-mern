const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String
    },
    image: {
      type: String,
      default: "",
    },
    imgTitle: {
      type: String,
    },
    ingSm: {
      type: String,
    },
    trailer: {
      type: String,
    },
    video: {
      type: String,
    },
    year: {
      type: String,
    },
    limit: {
      type: Number,
    },
    genre: {
      type: String,
    },
    isSeries: {
        type: Boolean,
        default: false
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", MovieSchema);
