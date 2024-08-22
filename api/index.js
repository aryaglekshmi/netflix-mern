const express = require("express");
const app = express();
const PORT = 1000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const routes = require("./routes/index");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

// Allow requests from your React app's domain
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's URL
  optionsSuccessStatus: 200, // Some legacy browsers choke on 204
};

app.use(cors(corsOptions)).use(express.json()).use("/api", routes);

app.listen(PORT, () => {
  console.log("Application is listening on " + PORT);
});
