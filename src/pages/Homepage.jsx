import Card from "components/Card";
import { useData } from "context/dataContext";
import React from "react";
import "stylesheets/homepage.css";

const Homepage = () => {
  const {
    currentList,
    score,
    countDown,
    timer,
    totalCards,
    totalMatchCard,
    initialTimer,
  } = useData();

  return (
    <div className="homepage">
      <div className="homepage__header">
        <h3>
          <i className="fa-solid fa-star"></i> {score}
        </h3>
        <h3>
          <i className="fa-solid fa-stopwatch"></i> {timer}
        </h3>
      </div>

      {/* Case: Time up but quiz Incomplete */}
      {totalMatchCard.length !== totalCards && timer === 0 && (
        <div className="initial__counter">
          <h1>Time up ! Your total score is </h1>
          <h1 className="counter__number">
            {score} / {currentList.length * 10}
          </h1>
          <h1>
            {score < 60
              ? `You can do better, try again  !`
              : `Yeyy ! You did really well`}
          </h1>
        </div>
      )}

      {/* Case: Both quiz completed */}
      {totalMatchCard.length === totalCards && (
        <div className="initial__counter">
          <h1>Nice work ! You passed all quizzes </h1>
        </div>
      )}

      {/* Initial countdown */}
      {countDown >= 1 && (
        <div className="initial__counter">
          <h1>Remember the cards</h1>
          <h1 className="counter__number">{countDown}</h1>
        </div>
      )}

      {/* Display Image grid  */}
      {timer > 0 && countDown < 1 && totalMatchCard.length !== totalCards && (
        <div className="quiz">
          <h1 className="quiz__heading">
            {initialTimer > 0 ? `Remember the cards` : `Match the cards`}
          </h1>
          <div className="quiz__grid">
            {currentList?.map((card, index) => (
              <Card card={card} index={index} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;
