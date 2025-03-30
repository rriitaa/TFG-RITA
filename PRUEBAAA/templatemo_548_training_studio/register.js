import React, { useState } from "react";
import { registerUser } from "../api";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser({ nombre, email, contraseña });
      setMensaje(response.message); // Mensaje de éxito
    } catch (error) {
      setMensaje("Error al registrar usuario");
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />

        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label>Contraseña:</label>
        <input type="password" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />

        <button type="submit">Registrarse</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Register;
