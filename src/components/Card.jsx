import React from "react";
import "../stylesheets/homepage.css";
import { useData } from "context/dataContext";

const Card = ({ card, index }) => {
  const {
    currentList,
    activeCard,
    setActiveCard,
    setCount,
    setScore,
    matchCard,
    setMatchCard,
    setcountDown,
    initialTimer,
    setStartInitialTimer,
    setStartTimer,
    setInitialTimer,
    setTimer,
    startTimer,
  } = useData();

  // Fliping the card
  const flipCard = (index) => {
    if (startTimer) {
      if (activeCard.length === 0) {
        setActiveCard([index]);
      } else if (activeCard.length === 1) {
        // check if both card mathcing or not
        if (currentList[activeCard[0]] === currentList[index]) {
          setMatchCard([...matchCard, activeCard[0], index]);
          setScore((prev) => prev + 20);
          // check if all card matched or not
          if (matchCard?.length + 2 === currentList?.length) {
            setActiveCard([]);
            setScore(0);
            setCount((prev) => prev + 1);
            setcountDown(5);
            setStartInitialTimer(false);
            setStartTimer(false);
            setInitialTimer(8);
            setTimer(30);
          }
        }
        setActiveCard([...activeCard, index]);
        setTimeout(() => {
          setActiveCard([]);
        }, 500);
      }
    }
  };

  // display image wrapper on card images
  const displayImg = () => {
    console.log(index);
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
