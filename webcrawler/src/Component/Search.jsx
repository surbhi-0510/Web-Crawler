import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";

const Search = ({handleClick}) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className="searchDiv">
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={handleChange}
      />
      <button type="submit"  onClick={()=>handleClick(value)}>
        <i className="fa fa-search"></i>
      </button>
    </div>
  );
};

export default Search;