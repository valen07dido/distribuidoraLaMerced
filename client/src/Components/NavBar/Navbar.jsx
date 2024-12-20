import React, { useState, useEffect } from "react";
import logo from "../../../public/logos/Logo.png";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup";
import getDecryptedData from "../../../utils/getDecryptedData"; // Importa la función de desencriptación
import Swal from "sweetalert2";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [UserId, setUserId] = useState("");
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleUserPanel = () => {
    setIsUserPanelOpen(!isUserPanelOpen);
  };

  const loadUserData = () => {
    const token = getDecryptedData("tokenSession");
    const user = getDecryptedData("username");
    const role = getDecryptedData("role");
    const userId = getDecryptedData("userid");

    // Verificar si la sesión ha expirado
    const sessionExpiration = localStorage.getItem("sessionExpiration");
    if (sessionExpiration && Date.now() > sessionExpiration) {
      handleLogout(); // Cerrar sesión si ha expirado
      return;
    }

    if (token && user) {
      setIsLoggedIn(true);
      setUsername(user);
      setRole(role);
      setToken(token);
      setUserId(userId);
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setRole("");
      setToken("");
      setUserId("");
    }
  };

  useEffect(() => {
    // Cargar los datos de la sesión del usuario al montar el componente
    loadUserData();
  }, []); // El efecto se ejecuta solo una vez al montar el componente

  useEffect(() => {
    const interval = setInterval(() => {
      const sessionExpiration = localStorage.getItem("sessionExpiration");
      if (sessionExpiration && Date.now() > sessionExpiration) {
        Swal.fire({
          title: "Sesión expirada",
          text: "Su sesión ha expirado. Por favor, inicie sesión nuevamente.",
          icon: "info",
          confirmButtonText: "Entendido",
        }).then(() => {
          handleLogout(); // Llama a la función para cerrar sesión
        });
      }
    }, 60000); // Revisa cada minuto

    return () => clearInterval(interval); // Limpia el intervalo cuando se desmonte el componente
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("tokenSession");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("role");
    localStorage.removeItem("sessionExpiration"); // Asegúrate de eliminar también la expiración
    setIsLoggedIn(false);
    setUsername("");
    setUserId("");
    setRole("");
    setIsUserPanelOpen(false);
    navigate("/");
    window.location.reload();
  };

  const handleLoginSuccess = (user) => {
    loadUserData(); // Cargar los datos del usuario cuando se loguea correctamente
    setIsLoginPopupOpen(false);
  };

  const handleShopCart = () => {
    if (role && role === "admin") {
      return Swal.fire({
        title: "El admin no tiene carrito de compras",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
    if (role && role === "customer") {
      navigate(`/carrito/${UserId}`);
    } else {
      return Swal.fire({
        title: "Debe registrarse para tener carrito",
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  return (
    <>
      <nav className={styles.container}>
        <Link to="/">
          <img
            src={
              "https://res.cloudinary.com/dpa8t14c2/image/upload/v1728922885/LaMerced/images/xd33y4g7t5dvqyltysbh.png"
            }
            alt="logo"
            className={styles.logo}
          />
        </Link>
        <div className={`${styles.flex1} ${menuOpen ? styles.menuOpen : ""}`}>
          <Link
            to="/productos"
            className={styles.links}
            onClick={() => {
              toggleMenu();
            }}
          >
            Productos
          </Link>
          <Link
            to="/beneficios"
            className={styles.links}
            onClick={() => {
              toggleMenu();
            }}
          >
            Beneficios
          </Link>
          <Link
            to="/nosotros"
            className={styles.links}
            onClick={() => {
              toggleMenu();
            }}
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className={styles.links}
            onClick={() => {
              toggleMenu();
            }}
          >
            Contáctanos
          </Link>
        </div>
        <div className={styles.flex2}>
          {isLoggedIn ? (
            <>
              <span className={styles.username} onClick={toggleUserPanel}>
                Hola, {username}
              </span>
              {isUserPanelOpen && (
                <div className={styles.userPanel}>
                  {role === "admin" ? (
                    <>
                      <Link
                        to={`/editar/${token}`}
                        onClick={toggleUserPanel}
                        className={styles.userPanelLink}
                      >
                        Editar Productos
                      </Link>
                      <Link
                        to={`/editarCarrito/${token}`}
                        onClick={toggleUserPanel}
                        className={styles.userPanelLink}
                      >
                        Editar Carritos
                      </Link>
                      <Link
                        to={`/crear/${token}`}
                        onClick={toggleUserPanel}
                        className={styles.userPanelLink}
                      >
                        Crear Producto
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/favoritos/${UserId}`}
                        onClick={toggleUserPanel}
                        className={styles.userPanelLink}
                      >
                        Mis Favoritos
                      </Link>
                    </>
                  )}
                  <button className={styles.logOut} onClick={handleLogout}>
                    Cerrar sesión
                  </button>
                </div>
              )}
            </>
          ) : (
            <FaUser className={styles.icon} onClick={toggleLoginPopup} />
          )}
          <FaShoppingCart
            className={styles.icon}
            onClick={() => handleShopCart()}
          />
          <button className={styles.menuButton} onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>

      {isLoginPopupOpen && (
        <LoginPopup
          onLoginSuccess={handleLoginSuccess}
          toggleLoginPopup={toggleLoginPopup}
        />
      )}
    </>
  );
};

export default Navbar;
