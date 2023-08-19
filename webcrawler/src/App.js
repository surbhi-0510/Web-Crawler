import "./App.css";
import Navbar from "./Component/Navbar/NavBar";
import React from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Logo from "./Component/Navbar/Logo";
import NavSave from "./Component/Navbar/Nav_save";

function App() {
  const options = {
    method: "GET",
    url: "http://localhost:8000/news",
  };
  axios
    .request(options)
    .then((res) => {
      // console.log("REQUESTING FOR NEWS!!")
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Logo />} />
        <Route path={"/save"} element={<NavSave />} />
      </Routes>
    </>
  );
}

export default App;
