import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/NavBar/Navbar";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Products from "./Pages/Product/Products";
import Footer from "./Components/Footer/Footer";
import Detail from "./Pages/Detail/Detail";
import Benefits from "./Pages/Benefits/Benefits";
import ActivateAccount from "./Pages/ActivateUser/ActivateUser";
import ProtectedRoute from "./Components/ProtectedRoutes";
import EditProduct from "./Pages/EditProduct/EditProduct";
import NotFound from "./Pages/NotFound/NotFound"; // Importa la página de 404
import CreateProduct from "./Pages/CreateProduct/CreateProduct";
import Cart from "./Pages/Cart/Cart";
import Wishlist from "./Pages/Wishlist/Wishlist";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/beneficios" element={<Benefits />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/productos" element={<Products />} />
        <Route path="/productos/:id" element={<Detail />} />
        <Route path="/carrito/:id" element={<Cart />} />
        <Route path="/favoritos/:id" element={<Wishlist />} />
        <Route path="/activate/:token" element={<ActivateAccount />} />
        <Route
          path="/editar/:token"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crear/:token"
          element={
            <ProtectedRoute>
              <CreateProduct />
            </ProtectedRoute>
          }
        />
        {/* Ruta para manejar páginas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
