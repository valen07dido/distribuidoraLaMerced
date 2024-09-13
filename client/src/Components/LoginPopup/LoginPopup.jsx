import React, { useState } from "react";
import styles from "./LoginPopup.module.css"; // Estilos para el popup
const url = import.meta.env.VITE_URL_BACKEND;
const key = import.meta.env.VITE_SECRET_KEY;
import CryptoJS from "crypto-js";

const LoginPopup = ({ toggleLoginPopup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/sesion/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    if (result.login) {
      const encryptedToken = CryptoJS.AES.encrypt(
        result.tokenSession,
        key
      ).toString();
      const encryptedUser = CryptoJS.AES.encrypt(result.user, key).toString();
      const encryptedRole = CryptoJS.AES.encrypt(result.role, key).toString();

      localStorage.setItem("tokenSession", encryptedToken);
      localStorage.setItem("username", encryptedUser);
      localStorage.setItem("role", encryptedRole);
      onLoginSuccess(result.user);
      toggleLoginPopup();
    } else {
      console.error("Error al iniciar sesión");
    }
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleBackToLoginClick = () => {
    setShowRegister(false);
  };

  return (
    <div className={styles.popupContainer}>
      <div className={styles.popup}>
        <button className={styles.closeButton} onClick={toggleLoginPopup}>
          &times;
        </button>
        <div className={styles.formData}>
          {showRegister ? (
            <>
              <h2>Registro</h2>
              <form className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="username">Nombre de usuario:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Registrarse
                </button>
                <button type="button" onClick={handleBackToLoginClick}>
                  Volver al Login
                </button>
              </form>
            </>
          ) : (
            <>
              <h2>Iniciar Sesión</h2>
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="password">Contraseña:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className={styles.submitButton}>
                  Ingresar
                </button>
                <button type="button" onClick={handleRegisterClick}>
                  ¿No tienes cuenta? Regístrate
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
