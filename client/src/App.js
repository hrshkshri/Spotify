import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
import Home from "./routes/Home";
import { useCookies } from "react-cookie";
import LoggedInHome from "./routes/LoggedInHome"
import UploadSong from "./routes/UploadSong";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          // logged in routes
          <Routes>
            <Route path="/home" element={<LoggedInHome />} />
            <Route path="/uploadSong" element={<UploadSong />} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
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
