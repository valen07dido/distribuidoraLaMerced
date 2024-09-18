import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"; // Si deseas agregar estilos

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <h1>404 - Página no encontrada</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className={styles.backHomeLink}>Volver al inicio</Link>
    </div>
  );
};

export default NotFound;
