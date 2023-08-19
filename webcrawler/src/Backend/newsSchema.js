const mongoose = require("mongoose");

// const newsSchema = new mongoose.Schema({
//   image: String,
//   tagLine: String,
//   url: String,
// });

const News = mongoose.model("New", {
    image: String,
    tagLine: String,
    url: String,
  });

module.exports.News = News;
