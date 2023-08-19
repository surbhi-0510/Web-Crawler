import React from "react";

// CHILDREN OF MAINAREA
const CardComponent = ({image,tagLine,url,_id,saveClicked}) => {
  return (
    <div className="cardComponent">
      <div className="card-content">
        <p>{tagLine}</p>
        <br></br>
        <a href={url} target="_blank">
            Read More..
        </a>
      </div>
      <div className="card-img">
        <img
          src={image}
          alt="image"
        />
      </div>
      <div>
        <button className="save-button" onClick={()=>saveClicked(_id)}>SAVE NOW!</button>
      </div>
    </div>
  );
};

export default CardComponent;