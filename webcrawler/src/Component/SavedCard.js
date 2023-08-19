import React from "react";

// CHILDREN OF SAVED NEWS TO DISPLAY INFORMATION
const SavedCard = ({ image, tagLine, url, _id, deleteClicked }) => {
  return (
    <div className="savedCard">
      <div className="card-content">
        <p>{tagLine}</p>
        <br></br>
        <a href={url} target="_blank">
          Read More..
        </a>
      </div>
      <div className="card-img">
        <img src={image} alt="image" />
      </div>
      <div>
        <button className="delete-button" onClick={()=>deleteClicked(_id)}>DELETE NOW!</button>
      </div>
    </div>
  );
};

export default SavedCard;
