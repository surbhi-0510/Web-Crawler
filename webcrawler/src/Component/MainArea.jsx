import React, { useRef } from "react";
import Search from "./Search";
import CardComponent from "./CardComponent";
import axios from "axios";
// const mongoose = require("mongoose");

const MainArea = () => {
  // window.location.reload();
  const [newsArray, setNewsArray] = React.useState([]);
  const prevSearch = useRef("");

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/getnews")
      .then((news) => {
        setNewsArray(news.data);
        // console.log("SETTING NEWS DATA")
      })
      .catch((err) => console.log(err));
  }, []);

  function handleClick(value) {
    console.log("value(handleClick):", value);
    // HANDLING SEARCH FUNCTIONALITY
    if (prevSearch.current !== value) {
      axios
        .get(`http://localhost:8000/searchnews/?q=${value}`)
        .then((news) => {
          // console.log("SETTING NEWS DATA", news.data);
          setNewsArray(news.data);
          prevSearch.current = value;
        })
        .catch((err) => {
          console.log("handleclick(err) :", err);
          // throw new Error();
        });
    }
  }

  async function saveNews(ele) {
    // POSTING SAVED NEWS
    try {
      await axios.post("http://localhost:8000/savednews", { ele });
      // console.log(`RESULT : ${result}`);
    } catch (err) {
      console.log(`ERROR(createNews) : ${err}`);
    }
  }
  function saveClicked(id) {
    // WORKS WHEN SAVED BUTTON IS CLICKED
    const savedArray = newsArray.filter((el) => el._id === id);
    saveNews(savedArray);
  }

  return (
    <div className="mainArea">
      <Search handleClick={handleClick} />
      {newsArray.map((el, i) => (
        <CardComponent
          saveClicked={saveClicked}
          key={el._id}
          tagLine={el.tagLine}
          url={el.url}
          image={el.image}
          _id={el._id}
        />
      ))}
    </div>
  );
};

export default MainArea;
