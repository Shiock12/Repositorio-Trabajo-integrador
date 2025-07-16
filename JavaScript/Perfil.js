document.addEventListener("DOMContentLoaded", () => {
  const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
  const usuarioActivo = JSON.parse(localStorage.getItem("usuarioLogueado"));

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

  const tarjeta = document.getElementById("tarjeta-de-credito");
  const cupon = document.getElementById("cupon-de-pago");
  const pagoFacil = document.getElementById("pago-facil");
  const rapipago = document.getElementById("rapipago");
  const transferencia = document.getElementById("metodo-de-pago");

  // Mostrar método de pago actual
  const metodo = usuarioActual.metodoDePago;
  if (metodo === "tarjeta-de-credito") {
    tarjeta.checked = true;
    if (usuarioActual.numeroDeTarjeta) {
      document.getElementById("numero-de-tarjeta").value = "**** **** **** " + usuarioActual.numeroDeTarjeta.slice(-4);
    }
    if (usuarioActual.codigoDeSeguridad) {
      document.getElementById("codigo-de-seguridad").value = "***";
    }
  } else if (metodo === "cupon-de-pago") {
    cupon.checked = true;
    if (usuarioActual.cuponDePago.value === "pago-facil") {
      pagoFacil.checked = true;
    } else if (usuarioActual.cuponDePago.value === "rapipago") {
      rapipago.checked = true;
    }
  } else if (metodo === "transferencia") {
    transferencia.checked = true;
  }

  // Exclusividad de métodos
  tarjeta.addEventListener("change", () => {
    if (tarjeta.checked) {
      cupon.checked = false;
      pagoFacil.checked = false;
      rapipago.checked = false;
      transferencia.checked = false;
    }
  });

  cupon.addEventListener("change", () => {
    if (cupon.checked) {
      tarjeta.checked = false;
      transferencia.checked = false;
      if (!pagoFacil.checked && !rapipago.checked) {
        pagoFacil.checked = true;
      }
    } else {
      pagoFacil.checked = false;
      rapipago.checked = false;
    }
  });

  pagoFacil.addEventListener("change", () => {
    if (pagoFacil.checked) {
      cupon.checked = true;
      tarjeta.checked = false;
      transferencia.checked = false;
    } else if (!rapipago.checked) {
      cupon.checked = false;
    }
  });

  rapipago.addEventListener("change", () => {
    if (rapipago.checked) {
      cupon.checked = true;
      tarjeta.checked = false;
      transferencia.checked = false;
    } else if (!pagoFacil.checked) {
      cupon.checked = false;
    }
  });

  transferencia.addEventListener("change", () => {
    if (transferencia.checked) {
      tarjeta.checked = false;
      cupon.checked = false;
      pagoFacil.checked = false;
      rapipago.checked = false;
    }
  });

  const guardarBtn = document.querySelector(".btn-primario");
  const cancelarBtn = document.querySelector(".btn-secundario");

  const camposValidos = () => {
  const nuevaPass = document.getElementById("nueva-contraseña").value;
  const repetirPass = document.getElementById("repetir-contraseña").value;

  const hayMetodo = document.querySelector("input[name='metodo-de-pago']:checked");
  const tieneCupon = cupon.checked && (pagoFacil.checked || rapipago.checked);

  const contrasenasVacias = nuevaPass === "" && repetirPass === "";

  const contrasenasIguales = nuevaPass === repetirPass;
  const contrasenaValida = /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|`~\-]){2,}).{8,}$/.test(nuevaPass);

  return (contrasenasVacias || (contrasenasIguales && contrasenaValida)) && (hayMetodo || tieneCupon);
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

    // TARJETA DE CRÉDITO
    if (tarjeta.checked) {
      let num = document.getElementById("numero-de-tarjeta").value.replace(/\s/g, "");
      const cod = document.getElementById("codigo-de-seguridad").value;

      const nuevaTarjetaIngresada = !num.includes("*") && /^\d+$/.test(num);
      const nuevoCodIngresado = cod !== "***" && /^[0-9]{3}$/.test(cod);

      if (nuevaTarjetaIngresada) {
        const suma = num.slice(0, 15).split("").reduce((a, b) => a + parseInt(b), 0);
        const ultimo = parseInt(num[15]);
        const sumaPar = suma % 2 === 0;

        if ((sumaPar && ultimo % 2 !== 1) || (!sumaPar && ultimo % 2 !== 0)) {
          alert("Número de tarjeta inválido según validación de suma");
          return;
        }

        usuarioActual.numeroDeTarjeta = num;
        document.getElementById("numero-de-tarjeta").value = "**** **** **** " + num.slice(-4);
      } else if (num.includes("*")) {
        num = usuarioActual.numeroDeTarjeta;
      } else {
        alert("Ingresá un número de tarjeta válido de 16 dígitos");
        return;
      }

      if (nuevoCodIngresado) {
        usuarioActual.codigoDeSeguridad = cod;
        document.getElementById("codigo-de-seguridad").value = "***";
      } else if (cod !== "***") {
        alert("Código de seguridad inválido (deben ser 3 dígitos)");
        return;
      }

      usuarioActual.metodoDePago = "tarjeta-de-credito";
    }

    // CUPÓN
    if (cupon.checked) {
      const tipoCupon = pagoFacil.checked ? "pago-facil" :
                        rapipago.checked ? "rapipago" : "";

      if (!tipoCupon) {
        alert("Debés seleccionar al menos un tipo de cupón");
        return;
      }

      usuarioActual.metodoDePago = "cupon-de-pago";
      usuarioActual.cuponDePago = tipoCupon;
    }

    // TRANSFERENCIA
    if (transferencia.checked) {
      usuarioActual.metodoDePago = "transferencia";
    }

    if (nuevaPass !== "") {
  usuarioActual.contraseña = nuevaPass;
}

    const index = usuarios.findIndex(u => u.nombreDeUsuario === usuarioActual.nombreDeUsuario);
    usuarios[index] = usuarioActual;

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioActual));

    alert("Cambios guardados correctamente");
    window.location.href = "./PantallaPrincipal.html";
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

  // Botón de cerrar sesión si existe
 const cerrarSesionBtn = document.getElementById("cerrar-sesion");
  cerrarSesionBtn.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "../index.html";
  })
});
