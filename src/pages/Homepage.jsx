import Card from "components/Card";
import { useData } from "context/dataContext";
import React from "react";
import "stylesheets/homepage.css";

const Homepage = () => {
  const { currentList, score, matchCard, data, countDown, timer, totalCards } =
    useData();

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
      {matchCard?.length !== data?.length && timer === 0 && (
        <div className="initial__counter">
          <h1>Time up ! Your total score is </h1>
          <h1 className="counter__number">{score} / 120</h1>
          <h1>
            {score < 60
              ? `You can do better, try again  !`
              : `Yeyy ! You did really well`}
          </h1>
        </div>
      )}

      {/* Case: Both quiz completed */}
      {matchCard?.length === totalCards && (
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
      {timer > 0 && countDown < 1 && matchCard?.length !== totalCards && (
        <div className="quiz">
          <h1 className="quiz__heading">Match the cards</h1>
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
