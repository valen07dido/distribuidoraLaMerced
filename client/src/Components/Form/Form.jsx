import React, { useState } from "react";
import styles from "./Form.module.css";
import swal from "sweetalert2";
import validations from "./Validations";
import Swal from "sweetalert2";
const url = import.meta.env.VITE_URL_BACKEND;
import localities from "../../../utils/localities";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    phone: "",
    email: "",
    Type: "",
    province: "",
    locality: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newData = { ...data, [name]: value };
    setData(newData);
    setErrors(validations(newData));
  };
  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setData({ ...data, province, locality: "" });
  };

  const handleLocalityChange = (event) => {
    const locality = event.target.value;
    setData({ ...data, locality });
  };

  const filteredLocalities = localities.filter(
    (loc) => loc.province === data.province
  );
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(errors).length > 0) {
      return Swal.fire({
        title: "Por favor revise los datos",
        text: "Verifique que no haya ningún error en los datos ingresados.",
        icon: "warning",
        confirmButtonText: "Entendido",
        customClass: { popup: styles.alert },
      });
    }
    try {
      swal.fire({
        title: "Por Favor espere.",
        text: "Estamos enviando su mensaje.",
        icon: "info",
        showConfirmButton: false,
        didClose: false,
        closeOnEsc: false,
        customClass: { popup: styles.alert },
        confirmButtonText: "Entendido",
      });
      swal.showLoading();
  
      const response = await fetch(`${url}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
  
      if (response.error) {
        swal.fire({
          title: "Algo falló",
          text: responseData.response,
          icon: "error",
          confirmButtonText: "Entendido",
          customClass: { popup: styles.alert },
        });
      } else {
        setData({
          name: "",
          phone: "",
          email: "",
          Type: "",
          province: "",
          locality: "",
          message: "",
        });
        swal.close();
        swal.fire({
          title: "¡Éxito!",
          text: "Mensaje enviado correctamente",
          icon: "success",
          confirmButtonText: "Entendido",
          customClass: { popup: styles.alert },
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      swal.fire({
        title: "Error",
        text: "Hubo un problema al enviar su mensaje. Por favor, inténtelo nuevamente más tarde.",
        icon: "error",
        confirmButtonText: "Entendido",
        customClass: { popup: styles.alert },
      });
    }
  };
  
  return (
    <div className={styles.container}>
      <div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>Contáctanos</h1>
          <h3>¡Recibe lista de precios y novedades!</h3>

          {/* Nombre */}
          <div className={styles.flex1}>
            <div
              className={errors.e1 ? styles.inputGroupError : styles.inputGroup}
            >
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                value={data.name}
                required
              />
              <label htmlFor="name">Nombre</label>
              {errors.e1 && <p className={styles.error}>*{errors.e1}*</p>}
            </div>

            {/* Teléfono */}
            <div
              className={errors.e3 ? styles.inputGroupError : styles.inputGroup}
            >
              <input
                type="tel"
                name="phone"
                id="phone"
                onChange={handleChange}
                value={data.phone}
                required
              />
              <label htmlFor="phone">Teléfono</label>
              {errors.e3 && <p className={styles.error}>*{errors.e3}*</p>}
            </div>
          </div>

          {/* Email */}
          <div
            className={errors.e2 ? styles.inputGroupError : styles.inputGroup}
          >
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              value={data.email}
              required
            />
            <label htmlFor="email">Email</label>
            {errors.e2 && <p className={styles.error}>*{errors.e2}*</p>}
          </div>

          {/* Provincia y Localidad */}
          <div className={styles.flex1}>
            <div className={styles.divSelect}>
              <label htmlFor="province">Provincia</label>
              <select
                name="province"
                id="province"
                value={data.province}
                onChange={handleProvinceChange}
                required
                className={styles.select}
              >
                <option value="">Seleccione una provincia</option>
                {Array.from(new Set(localities.map((loc) => loc.province))).map(
                  (province, index) => (
                    <option key={index} value={province}>
                      {province}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className={styles.divSelect}>
              <label htmlFor="locality">Localidad</label>
              <select
                name="locality"
                id="locality"
                value={data.locality}
                onChange={handleLocalityChange}
                disabled={!data.province}
                required
                className={styles.select}
              >
                <option value="">Seleccione una localidad</option>
                {filteredLocalities.map((loc, index) => (
                  <option key={index} value={loc.name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tipo de cliente */}
          <div className={styles.divSelect}>
            <label htmlFor="Type">Tipo de cliente</label>
            <select
              name="Type"
              id="Type"
              value={data.Type}
              onChange={handleChange}
              required
              className={styles.select}
            >
              <option value="">Seleccione un asunto</option>
              <option value="soy particular">Soy particular</option>
              <option value="tengo un pet shop">Tengo un pet shop</option>
              <option value="vendo online">Vendo online</option>
              <option value="estoy comenzando un emprendimiento">
                Estoy comenzando un emprendimiento
              </option>
              <option value="tengo un refugio">Tengo un refugio</option>
              <option value="soy creador">Soy creador</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Mensaje */}
          <div
            className={errors.e4 ? styles.inputGroupError : styles.inputGroup}
          >
            <textarea
              name="message"
              placeholder="Ingrese su mensaje aquí..."
              cols="100%"
              rows="10"
              required
              onChange={handleChange}
              value={data.message}
              className={errors.e4 ? styles.messageError : styles.message}
            ></textarea>
            {errors.e4 && <p className={styles.error}>*{errors.e4}*</p>}
          </div>

          {/* Botón de envío */}
          <button className={styles.buttons} type="submit">
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
