import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./routes/Login";

function App() {
  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        <Routes></Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
