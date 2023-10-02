import { useState } from "react";
import "./App.css";
import LandingpPage from "./pages/LandingpPage";
import MainPage from "./pages/MainPage";
import { Route, Routes } from "react-router-dom";

function App() {
  const [username, setUserName] = useState("");
  return (
    <div className="main">
      <Routes>
        <Route
          path="/"
          element={
            <LandingpPage setUserName={setUserName} username={username} />
          }
        />
        <Route path="/main" element={<MainPage username={username} />} />
      </Routes>
    </div>
  );
}

export default App;
