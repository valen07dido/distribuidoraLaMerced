import { Navigate } from "react-router-dom";
import getDecryptedData from "../../utils/getDecryptedData";
const ProtectedRoute = ({ children }) => {
  const token = getDecryptedData("tokenSession");
  const role = getDecryptedData("role");

  if (!token || role==="customer") {
    // Si no hay token, redirigir al usuario a la página de login (o cualquier otra ruta)
    return <Navigate to="/" />;
  }

  // Si el token está presente, renderiza el componente hijo
  return children;
};

export default ProtectedRoute;
