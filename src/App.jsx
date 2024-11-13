import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from './components/Navbar';
// import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
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
