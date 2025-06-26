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
  NUMERO_DE_TARJETA: "ingrese un numero de tarjeta valido",
  CODIGO_DE_SEGURIDAD: "ingrese un codigo de seguridad valido",
  CUPON_DE_PAGO: "seleccione una opcion"
};

const EXPRESIONES_REGULARES = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  LETRAS: /^[a-zA-Z\s]+$/,
  NUMEROS: /^\d+$/,
  LETRAS_Y_NUMEROS: /^[a-zA-Z0-9]+$/,
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
    const numeroDeTarjeta = document.getElementById("numero-de-tarjeta").value;
    const codigoDeSeguridad = document.getElementById("codigo-de-seguridad").value;
    const cuponDePago = document.querySelector('input[name="opcion-de-cupon"]:checked')

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
    //Campos para validar la contraseña
    const tieneDosLetras = '(?=(?:.*[A-Za-z]){2,})';
    const tieneDosNumeros = '(?=(?:.*\\d){2,})';
    const tieneDosEspeciales = '(?=(?:.*[^A-Za-z\\d]){2,})';
    const minimoOchoCaracteres = '.{8,}';
    
    //Expresion regular para validar la contraseña
    const contraseñaValida = new RegExp(
      `^${tieneDosLetras}${tieneDosNumeros}${tieneDosEspeciales}${minimoOchoCaracteres}$`
    );

    //Funcion que valida la contraseña
    function validarContraseña(contraseña) {
      return contraseñaValida.test(contraseña);
    };

    if (contraseña === "") {
      contraseñaError.textContent = MENSAJES_DE_ERROR.CONTRASEÑA;
      isFormValid = false;
    } else if (!validarContraseña(contraseña)) {
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
          window.location.href = "../index.html";

        }, 2000);
      }, 1000);
    }
  });
}
registerValidate();