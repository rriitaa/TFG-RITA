// Esta función se ejecutará cuando se envíe el formulario de registro
async function registerUser(event) {
    event.preventDefault();  // Prevenir el comportamiento por defecto del formulario (recargar la página)
  
    // Recoger los datos del formulario
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmar_contrasena = document.getElementById("confirmar_contrasena").value;
    const dob = document.getElementById("dob").value;
  
    // Crear un objeto con los datos para enviarlos
    const userData = {
      nombre,
      email,
      contrasena,
      confirmar_contrasena,
      dob
    };
  
    // Hacer la solicitud POST al servidor
    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Especifica que estamos enviando JSON
        },
        body: JSON.stringify(userData)  // Convertimos el objeto en JSON
      });
  
      const result = await response.json();  // Convertir la respuesta en JSON
  
      // Verificar el resultado de la respuesta
      if (response.ok) {
        alert("Registro exitoso: " + result.message);  // Mostrar el mensaje de éxito
      } else {
        alert("Error: " + result.message);  // Mostrar el mensaje de error
      }
  
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Hubo un error en el servidor.");
    }
  }
  
  // Asociamos la función al formulario de registro
  document.getElementById("registerForm").addEventListener("submit", registerUser);
  