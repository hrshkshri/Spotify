import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import { useState } from "react";
import { useCookies } from "react-cookie";
import LoggedInHome from "./routes/LoggedInHome";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import songContext from "./contexts/songContext";
import SearchPage from "./routes/SearchPage";

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // logged in routes
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
            }}
          >
            <Routes>
              <Route path="/home" element={<LoggedInHome />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          // logged out routes
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
