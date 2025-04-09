document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe de manera tradicional

    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const contrasena = document.getElementById("contrasena").value;
    const confirmarContrasena = document.getElementById("confirmar_contrasena").value;
    const dob = document.getElementById("dob").value;

    // Verificar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Crear el objeto de datos a enviar
    const datos = {
        nombre: nombre,
        email: email,
        contrasena: contrasena,
        dob: dob
    };

    // Enviar los datos al servidor usando Fetch API
    fetch("/registro", {  // Asegúrate de que esta ruta es correcta en tu servidor
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Usuario registrado correctamente.");
        } else {
            alert("Hubo un error al registrar el usuario.");
        }
    })
    .catch(error => {
        console.error("Error al registrar el usuario:", error);
        alert("Hubo un error al enviar los datos.");
    });
});
