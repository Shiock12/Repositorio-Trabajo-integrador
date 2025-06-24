document.addEventListener("DOMContentLoaded", () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || []);
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));

  if (!usuarioActivo) {
    alert("No hay usuario activo");
    window.location.href = "index.html";
    return;
  }

  const usuarioActual = usuarios.find(u => u.username === usuarioActivo.username);
  if (!usuarioActual) {
    alert("Usuario no encontrado");
    return;
  }

  // Mostrar datos
  document.getElementById("username").textContent = usuarioActual.username;
  document.getElementById("email").value = usuarioActual.email;

  // Mostrar método de pago
  if (usuarioActual.metodoPago === "tarjeta") {
    document.getElementById("tarjeta-de-credito").checked = true;
  } else if (usuarioActual.metodoPago === "cupon") {
    document.getElementById("cupon-de-pago").checked = true;
  } else if (usuarioActual.metodoPago === "transferencia") {
    document.getElementById("metodo-de-pago").checked = true;
  }

  const guardarBtn = document.querySelector(".btn-primario");
  const cancelarBtn = document.querySelector(".btn-secundario");

  const camposValidos = () => {
    const nuevaPass = document.getElementById("nueva-contraseña").value;
    const repetirPass = document.getElementById("repetir-contraseña").value;

    const hayMetodo = document.querySelector("input[name='metodo-de-pago']:checked");
    const tieneCupon = document.getElementById("cupon-de-pago").checked &&
      (document.getElementById("pago-facil").checked || document.getElementById("rapipago").checked);

    const contrasenasIguales = nuevaPass === repetirPass;
    const contrasenaValida = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]){2,}).{8,}$/.test(nuevaPass);

    return contrasenasIguales && contrasenaValida && (hayMetodo || tieneCupon);
  };

  // Validación dinámica
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      guardarBtn.disabled = !camposValidos();
    });
  });

  // Guardar cambios
  guardarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nuevaPass = document.getElementById("nueva-contraseña").value;
    const repetirPass = document.getElementById("repetir-contraseña").value;

    if (nuevaPass !== repetirPass) {
      alert("Las contraseñas no coinciden");
      return;
    }

    if (!camposValidos()) {
      alert("Verificá los campos antes de continuar");
      return;
    }

    // Validaciones extra de tarjeta
    if (document.getElementById("tarjeta-de-credito").checked) {
      const num = document.getElementById("numero-de-tarjeta").value;
      const cod = document.getElementById("codigo-de-seguridad").value;

      if (!/^[1-9]{3}$/.test(cod)) {
        alert("Código de seguridad inválido");
        return;
      }

      if (!/^\d{16}$/.test(num)) {
        alert("La tarjeta debe tener 16 dígitos");
        return;
      }

      const suma = num.slice(0, 15).split("").reduce((a, b) => a + parseInt(b), 0);
      const ultimo = parseInt(num[15]);
      const sumaPar = suma % 2 === 0;

      if ((sumaPar && ultimo % 2 !== 1) || (!sumaPar && ultimo % 2 !== 0)) {
        alert("Número de tarjeta inválido según validación de suma");
        return;
      }

      usuarioActual.metodoPago = "tarjeta";
    }

    if (document.getElementById("cupon-de-pago").checked) {
      if (!document.getElementById("pago-facil").checked && !document.getElementById("rapipago").checked) {
        alert("Debés seleccionar al menos un tipo de cupón");
        return;
      }
      usuarioActual.metodoPago = "cupon";
    }

    if (document.getElementById("metodo-de-pago").checked) {
      usuarioActual.metodoPago = "transferencia";
    }

    // Actualizar contraseña
    usuarioActual.password = nuevaPass;

    // Guardar en localStorage
    const index = usuarios.findIndex(u => u.username === usuarioActual.username);
    usuarios[index] = usuarioActual;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioActivo", JSON.stringify(usuarioActual));

    alert("Cambios guardados correctamente");
  });

  // Cancelar suscripción
  cancelarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (confirm("¿Estás seguro de cancelar la suscripción? Se eliminará tu cuenta.")) {
      const nuevosUsuarios = usuarios.filter(u => u.username !== usuarioActual.username);
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
      localStorage.removeItem("usuarioActivo");

      alert("Suscripción cancelada");
      window.location.href = "index.html";
    }
  });

  // Cerrar sesión
  const cerrarSesionBtn = document.createElement("button");
  cerrarSesionBtn.textContent = "Cerrar sesión";
  cerrarSesionBtn.className = "btn-secundario";
  cerrarSesionBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.href = "index.html";
  });

  document.querySelector(".footer").appendChild(cerrarSesionBtn);
});
