const MENSAJES_DE_ERROR = {
  NOMBRE: "el nombre es requerido",
  NOMBRE_INVALIDO: "no se permiten valores numericos",
  APELLIDO: "el apellido es requerido",
  APELLIDO_INVALIDO: "no se permiten valores numericos",
  EMAIL: "el email es requerido",
  EMAIL_NO_VALIDO: "el email no es valido",
  NOMBRE_DE_USUARIO: "el nombre de usuario es requerido",
  NOMBRE_DE_USUARIO_INVALIDO: "el nombre de usuario no es valido",
  CONTRASEÑA: "la contraseña es requerida",
  CONTRASEÑA_INVALIDA: "la contraseña debe tener ente 6 y 8 caracteres ( mínimo 2 letras, 2 números y 2 caracteres especiales)",
  REPETIR_CONTRASEÑA: "la constraseña es requerida",
  REPETIR_CONTRASEÑA_INVALIDA: "la constraseña debe ser igual a la anterior",
  METODO_DE_PAGO: "seleccione una opcion",
  NUMERO_DE_TARJETA:"ingrese un numero de tarjeta valido",
  CODIGO_DE_SEGURIDAD:"ingrese un codigo de seguridad valido",
  CUPON_DE_PAGO: "seleccione una opcion"
};

const EXPRESIONES_REGULARES = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  LETRAS: /^[a-zA-Z\s]+$/,
  NUMEROS: /^\d+$/,
  LETRAS_Y_NUMEROS: /^[a-zA-Z0-9]+$/,
  CONTRASEÑA: /^(?=(?:.*[A-Za-z]){2,})(?=(?:.*\d){2,})(?=(?:.*[^A-Za-z\d]){2,}).{6,8}$/
};

function registerValidate() {
  const registerForm = document.getElementById("register-form");
  const submitBtn = registerForm.querySelector(".js-submit-btn");
  const mensaje = document.querySelector(".js-mensaje");

  registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    //Imputs para validar
    const nombre = registerForm.querySelector("#nombre").value.trim();
    const apellido = registerForm.querySelector("#apellido").value.trim();
    const email = registerForm.querySelector("#email").value.trim();
    const nombreDeUsuario = registerForm.querySelector("#usuario").value.trim();
    const contraseña = registerForm.querySelector("#contraseña").value.trim();
    const repetirContraseña = registerForm.querySelector("#repetir-contraseña").value.trim();
    const metodoDePago = document.querySelector('input[name="metodo-de-pago"]:checked');

    //Mensajes de error
    const nombreError = registerForm.querySelector('.js-nombre-error');
    const apellidoError = registerForm.querySelector('.js-apellido-error');
    const emailError = registerForm.querySelector('.js-email-error');
    const nombreDeUsuarioError = registerForm.querySelector('.js-nombre-de-usuario-error');
    const contraseñaError = registerForm.querySelector('.js-contraseña-error');
    const repetirContraseñaError = registerForm.querySelector('.js-repetir-contraseña-error');
    const metodoDePagoError = registerForm.querySelector('.js-metodo-de-pago-error');
    const numeroDeTarjetaError = registerForm.querySelector('.js-numero-de-tarjeta-error');
    const codigoDeSeguridadError = registerForm.querySelector('.js-codigo-de-seguridad-error');
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
    codigoDeSeguridadError.textContent = "";
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

    }else if(metodoDePago.value === "tarjeta-de-credito"){

      const numeroDeTarjeta = document.querySelector('input[name="numero-de-tarjeta"]')
      const codigoDeSeguridad = document.querySelector('input[name="codigo-de-seguridad"]')

      if(!EXPRESIONES_REGULARES.NUMEROS.test(numeroDeTarjeta)){
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.NUMERO_DE_TARJETA;
        isFormValid = false;
      }else if(numeroDeTarjeta < 16){
        numeroDeTarjetaError.textContent = MENSAJES_DE_ERROR.NUMERO_DE_TARJETA;
        isFormValid = false;
      }

      if(!EXPRESIONES_REGULARES.NUMEROS.test(codigoDeSeguridad)){
        codigoDeSeguridadError.textContent = MENSAJES_DE_ERROR.CODIGO_DE_SEGURIDAD;
        isFormValid = false;
      }else if(codigoDeSeguridad.value === 0o0){
        codigoDeSeguridadError.textContent = MENSAJES_DE_ERROR.CODIGO_DE_SEGURIDAD;
        isFormValid = false;
      }

    }else if(metodoDePago.value === "cupon-de-pago"){
      const cuponDePago = document.querySelector('input[name="opcion-de-cupon"]:checked')
      if(!cuponDePago){
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

        setTimeout(function (){
          mensaje.textContent = "";
        }, 2000);   }

    if (isFormValid) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";

      setTimeout(function () {
        registerForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Guardar cambios";
        mensaje.textContent = "¡formulario enviado exitosamente!";

        setTimeout(function (){
          mensaje.textContent = "";
        }, 2000);
      }, 1000);
    }
  });
}

registerValidate();

      }, 1000);
    }
  });
}

registerValidate();







/*
document.querySelector(".formulario").addEventListener("submit", function (event){
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

  //Validar contraseñas coincidan
  if (contraseña !== repetirContraseña) {
    alert("Las contraseñas no coinciden");
    return;
  }

  //Obtiene los usuarios ya creados del localstorage
  const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];


  const usuarioExistente = usuariosGuardados.some(u => u.username === usuario);
  if (usuarioExistente) {
    alert("Este usuario ya existe. Por favor, elija otro")
    return;
  }

  const mailexistente = mailguardado.some(u => u.email === email);
  if (usuarioExistente) {
    alert("Este mail ya esta registrado.")
    return;
  }

  //Agrego un nuevo elemento al array de usuarios
  usuariosGuardados.push({
    username: usuario,
    password: contraseña,
    nombre: nombre,
    apellido: apellido,
    email: email
  });

  //Guardar el nuevo usuario en el localstorage
  localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
  alert("Usuario registrado correctamente");

  window.location.href = "../index.html"; //Volver al index

})
*/