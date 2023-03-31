const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());
const port = 5000;

app.use("/api/cars/", require("./routes/carsRoute"));
app.use("/api/users/", require("./routes/usersRoute"));
app.use('/api/bookings/' , require('./routes/bookingsRoute'))

// app.use("/login", require("./routes/usersRoute"));
// app.use("/register", require("./routes/usersRoute"));
app.get("/", (rep, res) => res.send("Hello World"));
app.listen(port, () => console.log("Node JS Server Started On Port 5000"));

// mongoose
//   .connect(
//     "mongodb+srv://shivkanta:sony1234@cluster0.rjfsk6g.mongodb.net/shivcar",
//     { useUnifiedTopology: true, useNewUrlParser: true }
//   )
//   .then(() => console.log("Mongo DB Connection Successfull"));

  mongoose
  .connect(
    "mongodb://localhost:27017/shivcar",
    { useUnifiedTopology: true, useNewUrlParser: true }
  )
  .then(() => console.log("Mongo DB Connection Successfull"));