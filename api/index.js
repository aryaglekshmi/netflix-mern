const express = require("express");
const app = express();
const PORT = 1000;
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const routes = require("./routes/index");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.json()).use("/api", routes);

app.listen(PORT, () => {
  console.log("Application is listening on " + PORT);
});
