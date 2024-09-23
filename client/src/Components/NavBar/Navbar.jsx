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
    console.log(userId)
    if (token && user) {
      try {
        setIsLoggedIn(true);
        setUsername(user);
        setRole(role);
        setToken(token);
        setUserId(userId);
      } catch (error) {
        setIsLoggedIn(false);
        setUsername("");
        setRole("");
        setToken("");
        setUserId("");
      }
    } else {
      setIsLoggedIn(false);
      setUsername("");
      setRole("");
      setToken("");
      setUserId("");
    }
  };

  useEffect(() => {
    loadUserData(); // Cargar los datos del usuario al montar el componente

    // Agregar un listener para escuchar cambios en el localStorage
    window.addEventListener("storage", loadUserData);

    // Limpiar el listener cuando el componente se desmonte
    return () => {
      window.removeEventListener("storage", loadUserData);
    };
  }, []);

  // Este useEffect se ejecuta cada vez que cambian el token, el rol o el username
  useEffect(() => {
    if (!isLoggedIn) {
      setIsUserPanelOpen(false); // Cerrar el panel de usuario si no está logueado
    }
  }, [token, role, username]);

  const handleLogout = () => {
    localStorage.removeItem("tokenSession");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("role"); // Asegúrate de eliminar también el rol
    setIsLoggedIn(false);
    setUsername("");
    setUserId("");
    setRole(""); // Actualizar el estado del rol a vacío
    setIsUserPanelOpen(false);
    navigate("/"); // Redirigir al home después del logout

    // Forzar la recarga de la página para eliminar cualquier caché de estado
    window.location.reload();
  };

  const handleLoginSuccess = (user) => {
    loadUserData(); // Cargar los datos del usuario cuando se loguea correctamente
    setIsLoginPopupOpen(false);
  };

  const handleShopCart = () => {
    if (role && role === "admin") {
     return Swal.fire({
        title: "el admin no tiene carrito de compras",
        icon: "error",
      });
    }
    if (role && role === "customer") {
      navigate(`/carrito/${UserId}`);
    }else{
      return Swal.fire({
        title: "Debe registrarse para tener carrito",
        icon: "error",
      });
    }

  };
  return (
    <>
      <nav className={styles.container}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
        <div className={`${styles.flex1} ${menuOpen ? styles.menuOpen : ""}`}>
          <Link
            to="/productos"
            className={styles.links}
            onClick={() => {
              toggleMenu();
              toggleUserPanel();
            }}
          >
            Productos
          </Link>
          <Link
            to="/beneficios"
            className={styles.links}
            onClick={() => {
              toggleMenu();
              toggleUserPanel();
            }}
          >
            Beneficios
          </Link>
          <Link
            to="/nosotros"
            className={styles.links}
            onClick={() => {
              toggleMenu();
              toggleUserPanel();
            }}
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className={styles.links}
            onClick={() => {
              toggleMenu();
              toggleUserPanel();
            }}
          >
            Contáctanos
          </Link>
        </div>
        <div className={styles.flex2}>
          {/* Icono de usuario y carrito */}
          {isLoggedIn ? (
            <>
              <span className={styles.username} onClick={toggleUserPanel}>
                Hola, {username}
              </span>
              {isUserPanelOpen && (
                <div className={styles.userPanel}>
                  {/* Opciones para ADMIN */}
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
                        to={`/crear/${token}`}
                        onClick={toggleUserPanel}
                        className={styles.userPanelLink}
                      >
                        Crear Producto
                      </Link>
                    </>
                  ) : (
                    <>
                      {/* Opciones para CUSTOMER */}
                      <Link to="/mi-cuenta" className={styles.userPanelLink}>
                        Mi Cuenta
                      </Link>
                      <Link
                        to="/mis-favoritos"
                        className={styles.userPanelLink}
                      >
                        Mis Favoritos
                      </Link>
                    </>
                  )}
                  <Link to="/configuracion" className={styles.userPanelLink}>
                    Configuración
                  </Link>
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
          {/* Botón de menú hamburguesa */}
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
