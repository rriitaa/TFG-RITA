// login.js

async function loginUser() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      // Mostrar el mensaje de bienvenida con el nombre del usuario
      document.getElementById("bienvenida").innerText = `Bienvenido, ${data.nombre}`;

      // Guardar el nombre en sessionStorage para usarlo en otras páginas si quieres
      sessionStorage.setItem("usuario", data.nombre);

      // Redirigir al inicio
      window.location.href = "inicio.html";
    } else {
      alert(data.message); // En caso de error, mostrar el mensaje de error
    }
  } catch (err) {
    alert("Error al conectar con el servidor");
    console.error(err);
  }
}
