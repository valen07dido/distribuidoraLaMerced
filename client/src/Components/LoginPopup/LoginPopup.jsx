import React, { useState } from "react";
import styles from "./LoginPopup.module.css"; // Estilos para el popup
const url = import.meta.env.VITE_URL_BACKEND;
import swal from "sweetalert2";
const key = import.meta.env.VITE_SECRET_KEY;
import CryptoJS from "crypto-js";

const LoginPopup = ({ toggleLoginPopup, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [telephone, setTelephone] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  console.log(url); 
  // Función de login
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    swal.fire({
      title: "Por Favor espere.",
      text: "Estamos procesando su mensaje.",
      icon: "info",
      showConfirmButton: false,
      didClose: false,
      closeOnEsc: false,
      customClass: { popup: styles.alert },
    });
    swal.showLoading();
    const response = await fetch(`${url}/sesion/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();
    console.log(result)
    if (result.login) {
      const encryptedToken = CryptoJS.AES.encrypt(result.tokenSession, key).toString();
      const encryptedUser = CryptoJS.AES.encrypt(result.user, key).toString();
      const encryptedRole = CryptoJS.AES.encrypt(result.role, key).toString();

      localStorage.setItem("tokenSession", encryptedToken);
      localStorage.setItem("username", encryptedUser);
      localStorage.setItem("role", encryptedRole);
      localStorage.setItem("user",response)
      onLoginSuccess(result.user);
      toggleLoginPopup();
      swal.close();
    } else {
      swal.fire({
        title: "Algo falló",
        text: result,
        icon: "error",
        customClass: { popup: styles.alert },
      });
    }
  };

  // Función de registro
  const handleSubmitRegister = async (e) => {
    e.preventDefault();

    swal.fire({
      title: "Por favor espere.",
      text: "Estamos procesando su registro.",
      icon: "info",
      showConfirmButton: false,
      didClose: false,
      closeOnEsc: false,
      customClass: { popup: styles.alert },
    });
    swal.showLoading();

    const response = await fetch(`${url}/sesion/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, surname, birthdate, email, telephone, password }),
    });
    const result = await response.json();
    if (!result.error) {
      const encryptedToken = CryptoJS.AES.encrypt(result.tokenSession, key).toString();
      const encryptedUser = CryptoJS.AES.encrypt(result.user, key).toString();
      const encryptedRole = CryptoJS.AES.encrypt(result.role, key).toString();

      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("tokenSession", encryptedToken);
      } else {
        console.error("localStorage no está disponible.");
      }
      
      localStorage.setItem("username", encryptedUser);
      localStorage.setItem("role", encryptedRole);

      toggleLoginPopup();
      swal.close();

      swal.fire({
        title: "Registro exitoso",
        text: "Se ha registrado correctamente. verifique su mail para activarlo",
        icon: "success",
        customClass: { popup: styles.alert },
      });
    } else {
      swal.fire({
        title: "Error al registrarse",
        text: result.response,
        icon: "error",
        customClass: { popup: styles.alert },
      });
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
              <form onSubmit={handleSubmitRegister} className={styles.form}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nombre:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="surname">Apellido:</label>
                  <input
                    type="text"
                    id="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="birthdate">Fecha de Nacimiento:</label>
                  <input
                    type="date"
                    id="birthdate"
                    value={birthdate}
                    onChange={(e) => setBirthdate(e.target.value)}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="telephone">Teléfono:</label>
                  <input
                    type="tel"
                    id="telephone"
                    value={telephone}
                    onChange={(e) => setTelephone(e.target.value)}
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
              <form onSubmit={handleSubmitLogin} className={styles.form}>
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
