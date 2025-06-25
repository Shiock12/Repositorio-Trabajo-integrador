document.addEventListener("DOMContentLoaded", () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || []);
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado")); // CAMBIADO

  if (!usuarioActivo) {
    alert("No hay usuario activo");
    window.location.href = "./index.html";
    return;
  }

  const usuarioActual = usuarios.find(u => u.nombreDeUsuario === usuarioActivo.nombreDeUsuario);
  if (!usuarioActual) {
    alert("Usuario no encontrado");
    return;
  }

  // Mostrar datos
  document.getElementById("username").textContent = usuarioActual.nombreDeUsuario;
  document.getElementById("email").value = usuarioActual.email;

  // Mostrar método de pago
  const metodo = usuarioActual.metodoDePago;
  if (metodo === "tarjeta-de-credito") {
    document.getElementById("tarjeta-de-credito").checked = true;

    if (usuarioActual.numeroDeTarjeta) {
      document.getElementById("numero-de-tarjeta").value = "**** **** **** " + usuarioActual.numeroDeTarjeta.slice(-4);
    }
  } else if (metodo === "cupon-de-pago") {
    document.getElementById("cupon-de-pago").checked = true;

    if (usuarioActual.cuponDePago === "pago-facil") {
      document.getElementById("pago-facil").checked = true;
    } else if (usuarioActual.cuponDePago === "rapipago") {
      document.getElementById("rapipago").checked = true;
    }
  } else if (metodo === "transferencia") {
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

  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => {
      guardarBtn.disabled = !camposValidos();
    });
  });

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

    if (document.getElementById("tarjeta-de-credito").checked) {
      const num = document.getElementById("numero-de-tarjeta").value.replace(/\s/g, "").replace(/\*/g, "");
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

      usuarioActual.metodoDePago = "tarjeta-de-credito";
      usuarioActual.numeroDeTarjeta = num;
      usuarioActual.codigoDeSeguridad = cod; // opcional, podés no guardarlo por seguridad
    }

    if (document.getElementById("cupon-de-pago").checked) {
      const tipoCupon = document.getElementById("pago-facil").checked ? "pago-facil" :
                        document.getElementById("rapipago").checked ? "rapipago" : "";

      if (!tipoCupon) {
        alert("Debés seleccionar al menos un tipo de cupón");
        return;
      }

      usuarioActual.metodoDePago = "cupon-de-pago";
      usuarioActual.cuponDePago = tipoCupon;
    }

    if (document.getElementById("metodo-de-pago").checked) {
      usuarioActual.metodoDePago = "transferencia";
    }

    usuarioActual.contraseña = nuevaPass;

    const index = usuarios.findIndex(u => u.nombreDeUsuario === usuarioActual.nombreDeUsuario);
    usuarios[index] = usuarioActual;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActual));

    alert("Cambios guardados correctamente");
  });

  cancelarBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (confirm("¿Estás seguro de cancelar la suscripción? Se eliminará tu cuenta.")) {
      const nuevosUsuarios = usuarios.filter(u => u.nombreDeUsuario !== usuarioActual.nombreDeUsuario);
      localStorage.setItem("usuarios", JSON.stringify(nuevosUsuarios));
      localStorage.removeItem("usuarioLogueado");

      alert("Suscripción cancelada");
      window.location.href = "../index.html";
    }
  });

  document.querySelector(".footer").appendChild(cerrarSesionBtn);
});
