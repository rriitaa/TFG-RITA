// login.js

async function loginUser() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      // Mostrar el mensaje de bienvenida
      document.getElementById("bienvenida").innerText = data.message; // Mostrar "Bienvenido, [nombre]"
    } else {
      alert(data.message); // En caso de error, mostrar el mensaje de error
    }
  }
s  