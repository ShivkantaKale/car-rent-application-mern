const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://shivkanta:sony1234@cluster0.rjfsk6g.mongodb.net/shivcar",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );
  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("Mongo DB Connection Successfull");
  });

  connection.on("error", () => {
    console.log("Mongo DB Connection Error");
  });
}

connectDB();

module.exports = mongoose;

//This is pure MONGODB connection.
//Globally index.js is replaced for server.js&db.js
