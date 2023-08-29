import "./App.css";
import Navbar from "./Component/Navbar/NavBar";
import React, { useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import MainArea from "./Component/MainArea";
import NavSave from "./Component/Navbar/Nav_save";

function App() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/news",
  };
  axios
    .request(options)
    .then((res) => {
      console.log("REQUESTING FOR NEWS!!", res.data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<MainArea />} />
        <Route path={"/save"} element={<NavSave />} />
      </Routes>
    </>
  );
}

export default App;
