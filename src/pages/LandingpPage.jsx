import React from "react";
import { useNavigate } from "react-router-dom";

const LandingpPage = ({ setUserName, username }) => {
  const navigate = useNavigate();
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
          />
          <br />
          <button
            disabled={!username}
            onClick={() => {
              navigate("/main");
            }}
            className="start-btn"
          >
            Start The Game
          </button>
        </div>
      </div>
    </>
  );
};

export default LandingpPage;
