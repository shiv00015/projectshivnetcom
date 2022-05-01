import React from "react";
import "./Card.css";
const Card = ({ title, time, levels, products, roles }) => {
  return (
    <div className="card">
      <div className="heading">
        <h3>MODULE</h3>
      </div>
      <div className="intro">
        <div className="title">
          <p>{title}</p>
        </div>
        <div className="subIntro">
          <p>Duration in Time: {time}</p>
        </div>
        <div className="techSkill">
          <li>{levels[0]}</li>
          <li>{products[0]}</li>
          <li>{roles[0]}</li>
        </div>
      </div>
    </div>
  );
};

export default Card;
