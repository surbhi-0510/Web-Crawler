const mongoose = require("mongoose");

const savedSchema = new mongoose.Schema({
  _id:mongoose.Schema.ObjectId,
  image: String,
  tagLine: String,
  url: String,
});
const collection=mongoose.model("savednews",savedSchema)
module.exports=collection
