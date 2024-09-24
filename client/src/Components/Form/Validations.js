const validations = ({
  name,
  email,
  phone,
  message,
  Type,
  province,
  locality,
}) => {
  const errors = {};

  if (!name || name.length === 0) {
    errors.e1 = "El nombre es obligatorio.";
  } else if (!/^[A-Za-z\s]+$/.test(name)) {
    errors.e1 = "El nombre debe contener solo letras.";
  }

  if (!email || email.length === 0) {
    errors.e2 = "El Email es obligatorio.";
  } else if (
    !/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)
  ) {
    errors.e2 = "El email debe ser válido.";
  }

  if (!phone || phone.length === 0) {
    errors.e3 = "El teléfono es obligatorio.";
  } else if (!/^\d{7,15}$/.test(phone)) {
    errors.e3 =
      "El teléfono debe contener solo números (entre 7 y 15 dígitos).";
  }

  if (!Type || Type.length === 0) {
    errors.e5 = "El tipo de cliente es obligatorio.";
  }

  // Validación de la provincia
  if (!province || province.length === 0) {
    errors.e6 = "Debe seleccionar una provincia.";
  }

  // Validación de la localidad
  if (!locality || locality.length === 0) {
    errors.e7 = "Debe seleccionar una localidad.";
  }

  // Validación del mensaje
  if (!message || message.length === 0) {
    errors.e4 = "El mensaje es obligatorio.";
  } else if (message.length < 10) {
    errors.e4 = "El mensaje debe tener mínimo 10 caracteres.";
  }

  return errors;
};

export default validations;
