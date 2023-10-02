import React, { useEffect, useState } from "react";
import img from "../assets/bg.jpg";
import congratsImg from "../assets/congrats.webp";
import gameover from "../assets/gameover.jpg";
import { moneyPyramid, questions } from "../data";
import correctSong from "../sounds/src_sounds_correct.mp3";
import wrongSong from "../sounds/src_sounds_wrong.mp3";

const MainPage = () => {
  const [count, setCount] = useState(30);
  const [hide, setHide] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [chance, setChance] = useState(0);
  const [earn, setEarn] = useState(0);

  const quesGenerator = () => {
    const randoms = Math.floor(Math.random() * 10);
    const question = { ...questions[randoms] };
    console.log("random", randoms);
    setQuestion(question);
    setTimeout(() => {
      setAnswer("");
      setHide(false);
    }, 2000);
    // clearTimeout(timeout);
  };

  useEffect(() => {
    quesGenerator();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);

      if (count === 0) {
        const audio = new Audio(wrongSong);
        audio.play();
        setAnswer("incorrect");
        setCount(30);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  const attemp = (val) => {
    if (val === "correct") {
      const audio = new Audio(correctSong);
      audio.play();
      setAnswer("correct");
      setChance(chance + 1);
      setCount(30);
      setHide(true);
      quesGenerator();
      setEarn((prev) => prev + chance * 100);
    } else {
      setAnswer("incorrect");
      setChance(0);
      setCount(0);
    }
  };
  console.log("chance", chance);
  return (
    <div className="main-page-wrapper">
      <div className="main-page-left">
        <img className="img" src={img} alt="crorepati" />
        {!hide && <div className="counter-btn">{count}</div>}
        {hide && (
          <img className="congratsImg" src={congratsImg} alt="congrats" />
        )}
        {answer === "incorrect" && (
          <img className="congratsImg" src={gameover} alt="gameover" />
        )}
        {answer === "incorrect" && (
          <div className="score">Your Earning= ${earn}</div>
        )}
        <div
          id={
            answer === "correct"
              ? "right"
              : "" || answer === "incorrect"
              ? "wrong"
              : ""
          }
          className="questions-btn "
        >
          {question.question}
        </div>
        <div className="options">
          {question.answers?.map((item, i) => (
            <button
              onClick={() => {
                if (item.correct === true) {
                  attemp("correct");
                } else {
                  attemp("incorrect");
                }
              }}
              key={i}
              className="option-btn"
              id={
                answer === "correct"
                  ? "right"
                  : "" || answer === "incorrect"
                  ? "wrong"
                  : ""
              }
            >
              {item.text}
            </button>
          ))}
        </div>
      </div>
      <div className="main-page-right">
        <ul>
          {moneyPyramid.map((value) => {
            return (
              <li
                id={answer === "correct" || chance === value.id ? "active" : ""}
                key={value.id}
                className="moneyList "
              >
                <span> {value.id}.</span>
                <span> {value.amount}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MainPage;
