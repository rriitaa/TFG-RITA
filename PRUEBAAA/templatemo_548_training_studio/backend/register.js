import { registerUser } from './api.js'; // Importamos la función desde api.js

// Obtén el formulario
const signupForm = document.getElementById("signupForm");

// Evento de envío del formulario
signupForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario (recargar la página)

    // Captura los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar_contrasena").value;
    const dob = document.getElementById("dob").value;

    // Validación básica de la contraseña
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden");
        return;
    }

    // Crea un objeto con los datos del usuario
    const userData = {
        nombre,
        email,
        contrasena,
        dob
    };

    try {
        // Llama a la función que registra al usuario
        const response = await registerUser(userData);
        alert("Usuario registrado con éxito");
        // Redirige o realiza alguna acción después del registro exitoso
    } catch (error) {
        alert("Error en el registro. Intenta nuevamente.");
    }
});
