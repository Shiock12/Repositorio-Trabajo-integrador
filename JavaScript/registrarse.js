console.log("hola");

document.querySelector(".formulario").addEventListener("submit", function (event) {
  event.preventDefault(); // Evita recargar la página

//Guardar datos del usuario a registrarse

const nombre = document.getElementById("Nombre").value.trim();
const apellido = document.getElementById("Apellido").value.trim();
const email = document.getElementById("email").value.trim();
const usuario = document.getElementById("user").value.trim();
const contraseña = document.getElementById("nueva-contraseña").value.trim();
const repetirContraseña = document.getElementById("repetir-contraseña").value.trim();

 if (!nombre || !apellido || !email || !usuario || !contraseña || !repetirContraseña) {
    alert("Por favor completá todos los campos obligatorios.");
    return;
  } 

    //Mensajes de error
    const nombreError = registerForm.querySelector('.js-nombre-error');
    const apellidoError = registerForm.querySelector('.js-apellido-error');
    const emailError = registerForm.querySelector('.js-email-error');
    const nombreDeUsuarioError = registerForm.querySelector('.js-nombre-de-usuario-error');
    const contraseñaError = registerForm.querySelector('.js-contraseña-error');
    const repetirContraseñaError = registerForm.querySelector('.js-repetir-contraseña-error');
    const metodoDePagoError = registerForm.querySelector('.js-metodo-de-pago-error');
    const numeroDeTarjetaError = registerForm.querySelector('.js-numero-de-tarjeta-error');
    const cuponDePagoError = registerForm.querySelector('.js-cupon-de-pago');

    //Reseteo de los mensajes de error
    nombreError.textContent = "";
    apellidoError.textContent = "";
    emailError.textContent = "";
    nombreDeUsuarioError.textContent = "";
    contraseñaError.textContent = "";
    repetirContraseñaError.textContent = "";
    metodoDePagoError.textContent = "";
    numeroDeTarjetaError.textContent = "";
    cuponDePagoError.textContent = "";

    let isFormValid = true;

    //Valida el nombre
    if (nombre === "") {
      nombreError.textContent = MENSAJES_DE_ERROR.NOMBRE;
      isFormValid = false;
    } else if (!EXPRESIONES_REGULARES.LETRAS.test(nombre)) {
      nombreError.textContent = MENSAJES_DE_ERROR.NOMBRE_INVALIDO;
      isFormValid = false;
    }

    //Valida el apellido
    if (apellido === "") {
      apellidoError.textContent = MENSAJES_DE_ERROR.APELLIDO;
      isFormValid = false;
    } else if (!EXPRESIONES_REGULARES.LETRAS.test(apellido)) {
      apellidoError.textContent = MENSAJES_DE_ERROR.APELLIDO_INVALIDO;
      isFormValid = false;
    }

    //Valida el email
    if (email === "") {
      emailError.textContent = MENSAJES_DE_ERROR.EMAIL;
      isFormValid = false;
    } else if (!EXPRESIONES_REGULARES.EMAIL.test(email)) {
      emailError.textContent = MENSAJES_DE_ERROR.EMAIL_NO_VALIDO;
      isFormValid = false;
    }

    //Valida el nombre de usuario
    if (nombreDeUsuario === "") {
      nombreDeUsuarioError.textContent = MENSAJES_DE_ERROR.NOMBRE_DE_USUARIO;
      isFormValid = false;
    } else if (!EXPRESIONES_REGULARES.LETRAS_Y_NUMEROS.test(nombreDeUsuario)) {
      nombreDeUsuarioError.textContent = MENSAJES_DE_ERROR.NOMBRE_DE_USUARIO_INVALIDO;
      isFormValid = false;
    }

    //Valida la contraseña
    if (contraseña === "") {
      contraseñaError.textContent = MENSAJES_DE_ERROR.CONTRASEÑA;
      isFormValid = false;
    } else if (!EXPRESIONES_REGULARES.CONTRASEÑA.test(contraseña)) {
      contraseñaError.textContent = MENSAJES_DE_ERROR.CONTRASEÑA_INVALIDA;
      isFormValid = false;
    }

    //Validar que las contraseñas sean iguales
    if (repetirContraseña === "") {
      repetirContraseñaError.textContent = MENSAJES_DE_ERROR.REPETIR_CONTRASEÑA;
      isFormValid = false;
    } if (!(repetirContraseña === contraseña)) {
      repetirContraseñaError.textContent = MENSAJES_DE_ERROR.REPETIR_CONTRASEÑA_INVALIDA;
      isFormValid = false;
    }

    //Valida el metodo de pago
    if (!metodoDePago) {
      metodoDePagoError.textContent = MENSAJES_DE_ERROR.METODO_DE_PAGO;
      isFormValid = false;

    } else if (metodoDePago.value === "tarjeta-de-credito") {

      function validarTarjeta(tarjeta) {
        const numeros = tarjeta.split('').map(Number);
        const suma = numeros.slice(0, 15).reduce((acc, num) => acc + num, 0);
        const ultimo = numeros[15];

        let esValida = false;

        if ((suma % 2 === 0 && ultimo % 2 === 1) || (suma % 2 === 1 && ultimo % 2 === 0)) {
          esValida = true;
        }

        return esValida;
      }

      if (!EXPRESIONES_REGULARES.NUMEROS.test(numeroDeTarjeta)) {
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.NUMERO_DE_TARJETA;
        isFormValid = false;
      } else if (numeroDeTarjeta.length < 16) {
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.NUMERO_DE_TARJETA;
        isFormValid = false;
      } else if (!validarTarjeta(numeroDeTarjeta)) {
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.NUMERO_DE_TARJETA;
        isFormValid = false;
      }

      if (!EXPRESIONES_REGULARES.NUMEROS.test(codigoDeSeguridad)) {
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.CODIGO_DE_SEGURIDAD;
        isFormValid = false;
      } else if (codigoDeSeguridad.length < 3) {
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.CODIGO_DE_SEGURIDAD;
        isFormValid = false;
      } else if (codigoDeSeguridad === "000") {
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.CODIGO_DE_SEGURIDAD;
        isFormValid = false;
      }

    } else if (metodoDePago.value === "cupon-de-pago") {
      if (!cuponDePago) {
        cuponDePagoError.textContent = MENSAJES_DE_ERROR.CUPON_DE_PAGO;
        isFormValid = false
      }
    }

    if (isFormValid) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      
      setTimeout(function () {
        registerForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Guardar cambios";
        mensaje.textContent = "¡formulario enviado exitosamente!";

        let nuevoUsuario;
        if (metodoDePago.value === "tarjeta-de-credito") {
          nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            nombreDeUsuario: nombreDeUsuario,
            contraseña: contraseña,
            metodoDePago: metodoDePago.value,
            numeroDeTarjeta: numeroDeTarjeta,
            codigoDeSeguridad: codigoDeSeguridad,
          }
        } else if (metodoDePago.value === "cupon-de-pago") {
          nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            nombreDeUsuario: nombreDeUsuario,
            contraseña: contraseña,
            metodoDePago: metodoDePago.value,
            cuponDePago: cuponDePago.value,
          }
        } else {
          nuevoUsuario = {
            nombre: nombre,
            apellido: apellido,
            email: email,
            nombreDeUsuario: nombreDeUsuario,
            contraseña: contraseña,
            metodoDePago: metodoDePago.value,
          }
        }

        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        console.log(JSON.parse(localStorage.getItem("usuarios")) || []);

        setTimeout(function () {
          mensaje.textContent = "";
        }, 2000);
      }, 1000);
    }
  });
}

//Obtiene los usuarios ya creados del localstorage
const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];


const usuarioExistente = usuariosGuardados.some(u => u.username === usuario);
if(usuarioExistente){
    alert("Este usuario ya existe. Por favor, elija otro")
    return;
}

const mailexistente = usuariosGuardados.some(u => u.email === email);
if (mailexistente) {
  alert("Este mail ya está registrado.");
  return;
}

let metodoPago = "";
if(document.getElementById("tarjeta-de-credito").checked){
  metodoPago = "tarjeta";
}
else if (document.getElementById("cupon-de-pago").checked){
  metodoPago = "cupon";
}
else if (document.getElementById("transferencia").checked){
  metodoPago = "transferencia";
}

//Agrego un nuevo elemento al array de usuarios
  const nuevoUsuario = {
    username: usuario,
    password: contraseña,
    nombre: nombre,
    apellido: apellido,
    email: email,
    metodoPago : metodoPago
  }
    //Guardar el nuevo usuario en el localstorage
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    alert("Usuario registrado correctamente");

    // Usuario que inicie sesion ultimo
    localStorage.setItem("usuarioActivo", JSON.stringify(nuevoUsuario));

    window.location.href = "../index.html"; //Volver al index

})