const express = require("express");
const collection = require("./savedSchema");
const app = express();
const cheerio = require("cheerio");
const cors = require("cors");
const axios = require("axios");
const { News } = require("../Backend/newsSchema");
require("../Backend/db")();

async function createNews(ele) {
  // SENDING DATA TO MONGODB USING CREATENEWS FUNCTION
  try {
    let newsDetail = new News({
      image: ele.src,
      tagLine: ele.title,
      url: ele.link,
    });
    const alreadyExistNews = await News.find({ tagLine: ele.title });
    if (!alreadyExistNews.length) {
      const result = await newsDetail.save();
    }
  } catch (err) {
    console.log(`ERROR(createNews) : ${err}`);
  }
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

app.get("/news", async (req, res) => {
  // SCRAPING NEWS
  const url = "https://timesofindia.indiatimes.com/?from=mdr";
  var $;
  axios(url).then((result) => {
    const html = result.data;
    $ = cheerio.load(html);

    const anchor_title = $("._YVis")
      .map((i, card) => {
        return {
          title: $(card).find("a").text(),
          link: $(card).find("a").attr("href"),
        };
      })
      .get();

    const images = $(".Bw78m")
      .map((i, card) => {
        let result = $(card)
          .html()
          .split(" ")
          .filter((ele) => {
            return ele.slice(0, 8) == "data-src";
          });

        return {
          src: result[0]?.slice(10, result[0].length - 1),
        };
      })
      .get();

    const final_array = [];
    for (let i = 1; i < anchor_title.length; i++) {
      const obj = Object.assign(anchor_title[i], images[i]);
      final_array.push(obj);
    }
    for (let i = 0; i < final_array.length; i++) {
      createNews(final_array[i]);
    }
    // res.send("SENDING DATA TO MONGODB USING CREATENEWS FUNCTION");
  });
});

app.get("/getnews", (req, res) => {
  // EXTRACTING NEWS FROM OUR DATABASE
  News.find()
    .select("-__v")
    .limit(173)
    .then((news) => res.json(news))
    .catch((err) => res.json(err));
});

app.get("/viewsavednews", async (req, res) => {
  // EXTRACTING SAVED NEWS FROM OUR DATABASE
  const viewSavedNews = await collection.find();
  res.send(viewSavedNews);
});

app.get("/searchnews", async (req, res) => {
  const search = req.query["q"];
  // SEARCHING NEWS FROM OUR DATABASE
  const viewSearchNews = await News.find({
    tagLine: { $regex: search, $options: "i" },
  });
  res.send(viewSearchNews);
});

app.post("/savednews", async (req, res) => {
  // SENDING SAVED NEWS TO BE STORED IN MONGODB
  const saved_news = req.body.ele[0];
  const data = {
    _id: saved_news._id,
    image: saved_news.image,
    tagLine: saved_news.tagLine,
    url: saved_news.url,
  };
  await collection.insertMany(data);
});

app.delete("/deletesavednews", async (req, res) => {
  // DELETING SAVED NEWS FROM MONGODB
  const updateNews = await collection.findByIdAndDelete(req.body._id);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("on port 8000");
});

exports = module.exports = app;
