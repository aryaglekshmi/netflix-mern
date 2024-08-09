const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
    },
    genre: {
      type: String,
    },
    content: {
        type: Array
      },
  },
  { timestamps: true }
);

module.export = mongoose.model("Movie", MovieSchema);
