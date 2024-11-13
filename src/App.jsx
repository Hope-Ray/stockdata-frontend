import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from './components/Navbar';
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Check for token and avoid redirecting if already on login or register page
    if (
      !token &&
      location.pathname !== "/login" &&
      location.pathname !== "/register"
    ) {
      window.location.href = "/login";
    }
  }, [location.pathname]);
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
