document.getElementById('signupForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const contrasena = document.getElementById('contrasena').value;
  const confirmar_contrasena = document.getElementById('confirmar_contrasena').value;
  const dob = document.getElementById('dob').value;

  const data = {
      nombre,
      email,
      contrasena,
      confirmar_contrasena,
      dob
  };

  try {
      const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      const result = await response.json();
      alert(result.message);
  } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al registrar el usuario');
  }
});
