import axios from "axios";

const API_URL = "http://localhost:5000"; // URL de tu backend

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response?.data);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error.response?.data);
    throw error;
  }
};

export const subirEjercicio = async (ejercicioData) => {
  try {
    const response = await axios.post(`${API_URL}/subir-ejercicio`, ejercicioData);
    return response.data;
  } catch (error) {
    console.error("Error al subir ejercicio:", error.response?.data);
    throw error;
  }
};

export const obtenerCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener categorías:", error.response?.data);
    throw error;
  }
};

export const obtenerEjerciciosPorCategoria = async (categoria_id) => {
  try {
    const response = await axios.get(`${API_URL}/ejercicios/${categoria_id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ejercicios:", error.response?.data);
    throw error;
  }
};

export const crearRutina = async (rutinaData) => {
  try {
    const response = await axios.post(`${API_URL}/crear-rutina`, rutinaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear rutina:", error.response?.data);
    throw error;
  }
};

export const obtenerRutinasPorUsuario = async (usuario_id) => {
  try {
    const response = await axios.get(`${API_URL}/mis-rutinas/${usuario_id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener rutinas:", error.response?.data);
    throw error;
  }
};
