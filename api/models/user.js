const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // profilePic: {
    //   type: String,
    //   default: "",
    // },
    // isAdmin: {
    //   type: Boolean,
    //   required: true,
    //   default: false,
    // },
    likedMovies: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
