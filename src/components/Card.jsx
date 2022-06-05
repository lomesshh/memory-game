import React from "react";
import "../stylesheets/homepage.css";
import { useData } from "context/dataContext";

const Card = ({ card, index }) => {
  const { activeCard, matchCard, initialTimer, flipCard } = useData();

  // display image wrapper on card images
  const displayImg = () => {
    const IMG_WRAPPER =
      "https://res.cloudinary.com/dgwzpbj4k/image/upload/v1654351354/memory-game/images/cardcover_urlvva.png";

    let displayImage =
      activeCard.indexOf(index) !== -1 || matchCard.indexOf(index) !== -1
        ? card.image
        : IMG_WRAPPER;

    return displayImage;
  };

  return (
    <div className="grid__card">
      <div className="card__image" onClick={() => flipCard(index)}>
        <img
          src={initialTimer > 0 ? card.image : displayImg()}
          alt="demo_img"
        />
      </div>
    </div>
  );
};

export default Card;
