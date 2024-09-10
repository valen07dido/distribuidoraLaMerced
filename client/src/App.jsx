import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Register from "./Pages/Register/Register";
import Contact from "./Pages/Contact/Contact";
import Products from "./Pages/Product/Products";
import Footer from "./Components/Footer/Footer";
import Detail from "./Pages/Detail/Detail";
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
        <Route path="/productos/:id" element={<Detail/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
