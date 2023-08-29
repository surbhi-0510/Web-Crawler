const mongoose = require("mongoose");

module.exports=function() {
  mongoose
    .connect("mongodb://localhost:27017/webcrawler")
    .then(() => {
      console.log("Connected to mongodb...");
    })
    .catch((err) => {
      console.error(`Error(connection) : ${err}`);
    });
}