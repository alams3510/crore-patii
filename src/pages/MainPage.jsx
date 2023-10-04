import React, { useEffect, useState } from "react";
import { moneyPyramid, questions } from "../data";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [count, setCount] = useState(30);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [totalEarn, setTotalEarn] = useState(0);
  const [earnCount, setEarnCount] = useState(0);
  const navigate = useNavigate();

  const quesGenerator = () => {
    const randoms = Math.floor(Math.random() * 10);
    const question = { ...questions[randoms] };
    setQuestion(question);
    setSelectedAnswer(question?.answers.map((val) => val.text));
    setTotalEarn((prev) => {
      return prev + (earnCount + 1) * 100 - 100;
    });
    setCount(30);
  };
  useEffect(() => {
    quesGenerator();
  }, []);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count - 1);
      if (count === 0) {
        setAnswer("incorrect");
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [count]);

  const attempt = (val, item) => {
    setSelectedAnswer(item);
    if (val === "correct") {
      setAnswer("correct");
      delay(3000, () => {
        setEarnCount(earnCount + 1);
      });
      delay(4000, () => {
        quesGenerator();
      });
    } else {
      setAnswer("incorrect");
      setCount(0);
    }
  };
  return (
    <div className="main-page-wrapper">
      <div className="main-page-left">
        <div className="left-wrraper">
          {count >= 0 && <div className="timer">{count}</div>}
          <button className="question">{question?.question}</button>
          <div className="answer">
            {question.answers?.map((item, i) => {
              return (
                <button
                  onClick={() =>
                    item.correct === true
                      ? attempt("correct", item)
                      : attempt("incorrect", item)
                  }
                  key={i}
                  className={
                    item.text === selectedAnswer.text ? `opt ${answer}` : "opt"
                  }
                  id={answer === "incorrect" ? "disabled" : ""}
                  disabled={answer === "incorrect"}
                >
                  {item.text}
                </button>
              );
            })}
          </div>
        </div>

        {answer === "incorrect" && (
          <>
            <h1
              style={{
                fontSize: "50px",
                fontWeight: "500",
                color: "white",
                textAlign: "center",
                marginTop: "15%",
              }}
            >
              YOU HAVE TOTAL EARNINGS OF {totalEarn}
            </h1>
            <br />
            <button onClick={() => navigate("/")} style={{ margin: "auto" }}>
              go back
            </button>
          </>
        )}
      </div>
      <div className="main-page-right">
        <ul>
          {moneyPyramid.map((value) => {
            return (
              <li
                key={value.id}
                className={
                  earnCount === value.id ? "moneyList active" : "moneyList"
                }
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
