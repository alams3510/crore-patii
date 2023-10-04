import { useState } from "react";
import "./App.css";
import LandingpPage from "./pages/LandingpPage";
import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";
import tiktik from "./sounds/clock-ticking.mp3";

function App() {
  const [username, setUserName] = useState("");
  const titiksound = new Audio(tiktik);
  return (
    <div className="main">
      <Routes>
        <Route
          path="/"
          element={
            <LandingpPage
              titiksound={titiksound}
              setUserName={setUserName}
              username={username}
            />
          }
        />

        <Route
          path="/main"
          element={<MainPage titiksound={titiksound} username={username} />}
        />
      </Routes>
    </div>
  );
}

export default App;
