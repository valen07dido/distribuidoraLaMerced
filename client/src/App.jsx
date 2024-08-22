import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/registrarse" element={<Register />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/productos" element={<Products />} />

      </Routes>
    </Router>
  );
}

export default App;
