import React from "react";
import { useNavigate } from "react-router-dom";
import song from "../sounds/src_sounds_play.mp3";
import tiktik from "../sounds/clock-ticking.mp3";

const LandingpPage = ({ setUserName, username }) => {
  const navigate = useNavigate();
  var audio = new Audio(song);
  return (
    <>
      <div className="landingPage">
        <h1>Are you Ready for the Game?</h1>
        <div className="centerElement">
          <input
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            value={username}
            className="name"
            type="text"
            placeholder="Enter Your Name"
            required={true}
          />
          <br />
          <button
            onClick={() => {
              navigate("/main");
              audio.play();
              new Audio(tiktik).play();
            }}
            className="start-btn"
          >
            Start
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingpPage;
