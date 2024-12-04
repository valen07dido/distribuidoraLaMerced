import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const url = import.meta.env.VITE_URL_BACKEND;

const ActivateAccount = () => {
  const { token } = useParams(); // Capturamos el token de la URL
  const navigate = useNavigate(); // Hook para redirigir
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const activateUser = async () => {
      try {
        setLoading(true);
        Swal.fire({
          title: "Activando cuenta...",
          text: "Por favor, espera mientras activamos tu cuenta",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });

        const response = await fetch(`${url}/sesion/activate/${token}`, {
          method: "POST",
        });
        const data = await response.json();
        setLoading(false);

        if (data.error) {
          Swal.fire({
            icon: "error",
            title: "Error al activar la cuenta",
            text: data.response,
            confirmButtonText: "Entendido",
          });
        } else {
          Swal.fire({
            icon: "success",
            title: "Cuenta activada exitosamente",
            text: "Tu cuenta ha sido activada. ¡Bienvenido!",
            confirmButtonText: "Ir al Inicio",
          }).then(() => {
            navigate("/"); 
          });
        }
      } catch (error) {
        setError(error.response);
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error inesperado",
          text: "Hubo un problema al activar la cuenta. Por favor, intenta más tarde.",
          confirmButtonText: "Aceptar",
        });
      }
    };

    activateUser();
  }, [token, navigate]);

  return (
    <div>
      <h1>Activando tu cuenta...</h1>
    </div>
  );
};

export default ActivateAccount;
