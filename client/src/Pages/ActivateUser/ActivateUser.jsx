import { useEffect } from "react";
import { useParams } from "react-router-dom";
const url = import.meta.env.VITE_URL_BACKEND;

const ActivateAccount = () => {
  const { token } = useParams(); // Capturamos el token de la URL

  useEffect(() => {
    const activateUser = async () => {
      try {
        const response = await fetch(`${url}/sesion/activate/${token}`, {
          method: "POST",
        });
        const data = await response.json();
        if (data.error) {
          console.log("Error al activar la cuenta:", data.response);
        } else {
          console.log("Cuenta activada exitosamente");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    activateUser();
  }, [token]);

  return <div>Activando tu cuenta...</div>;
};

export default ActivateAccount;
