const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

const app = express();
const url = "mongodb+srv://test:123@cluster0.rppvb8f.mongodb.net/?retryWrites=true&w=majority"

app.use(cors());
app.use(express.json());

mongoose
  .connect(url)
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});