import React, { useState, useEffect } from "react";
import logo from "../../../public/logos/Logo.png";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import LoginPopup from "../LoginPopup/LoginPopup";
import getDecryptedData from "../../../utils/getDecryptedData"; // Importa la función de desencriptación

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const [role,setRole]=useState("")
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleLoginPopup = () => {
    setIsLoginPopupOpen(!isLoginPopupOpen);
  };

  const toggleUserPanel = () => {
    setIsUserPanelOpen(!isUserPanelOpen);
  };

  useEffect(() => {
    const token = getDecryptedData("tokenSession");
    const user = getDecryptedData("username");
    const role = getDecryptedData("role");
   
    if (token && user) {
      try {
        setIsLoggedIn(true);
        setUsername(user);
        setRole(role)
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    setIsLoginPopupOpen(false);
  };

  return (
    <>
      <nav className={styles.container}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.logo} />
        </Link>
        <div className={`${styles.flex1} ${menuOpen ? styles.menuOpen : ""}`}>
          <Link to="/productos" className={styles.links} onClick={toggleMenu}>
            Productos
          </Link>
          <Link to="/beneficios" className={styles.links} onClick={toggleMenu}>
            Beneficios
          </Link>
          <Link to="/nosotros" className={styles.links} onClick={toggleMenu}>
            Nosotros
          </Link>
          <Link to="/contacto" className={styles.links} onClick={toggleMenu}>
            Contáctanos
          </Link>
        </div>
        <div className={styles.flex2}>
          <button className={styles.menuButton} onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
          {isLoggedIn ? (
            <div className={styles.userContainer}>
              <span className={styles.username} onClick={toggleUserPanel}>
                Hola, {username}
              </span>
              {isUserPanelOpen && (
                <div className={styles.userPanel}>
                  <Link to="/perfil" className={styles.userPanelLink}>Perfil</Link>
                  <Link to="/configuracion" className={styles.userPanelLink}>Configuración</Link>
                  <button
                    className={styles.userPanelLink}
                    onClick={() => {
                      localStorage.removeItem("tokenSession");
                      localStorage.removeItem("username");
                      setIsLoggedIn(false);
                      setUsername("");
                      setIsUserPanelOpen(false);
                    }}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <FaUser className={styles.icon} onClick={toggleLoginPopup} />
          )}
          <FaShoppingCart className={styles.icon} />
        </div>
      </nav>

      {isLoginPopupOpen && <LoginPopup onLoginSuccess={handleLoginSuccess}  toggleLoginPopup={toggleLoginPopup}/>}
    </>
  );
};

export default Navbar;
