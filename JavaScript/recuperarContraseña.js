const MENSAJES_DE_ERROR = {
    EMAIL: "ingrese un email",
    EMAIL_INVALIDO: "email invalido",
    EMAIL_NO_ENCONTRADO: "email no encontrado",
    NOMBRE_DE_USUARIO: "ingrese el nombre de usuario",
    NOMBRE_DE_USUARIO_INVALIDO: "nombre de usuario invalido",
    NOMBRE_DE_USUARIO_NO_ENCONTRADO: "nombre de usuario no encontrado",
};

const EXPRESIONES_REGULARES = {
    EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    LETRAS_Y_NUMEROS: /^[a-zA-Z0-9]+$/
};

function recuperarContraseña() {
    const recuperarContraseñaForm = document.getElementById("recuperar-contraseña-form");
    const submitBtn = recuperarContraseñaForm.querySelector(".js-submit-btn");
    const mensaje = document.querySelector(".js-mensaje");

    recuperarContraseñaForm.addEventListener("submit", function (event) {
        event.preventDefault();

        //Usuarios cargados en Local Storage
        const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

        //Imputse para validar
        const email = recuperarContraseñaForm.querySelector("#email").value.trim();
        const nombreDeUsuario = recuperarContraseñaForm.querySelector("#nombreDeUsuario").value.trim();

        //Mensajes de error
        const emailError = recuperarContraseñaForm.querySelector(".js-email-error");
        const nombreDeUsuarioError = recuperarContraseñaForm.querySelector(".js-nombre-de-usuario-error");

        //Reseteo de los mensajes de error
        emailError.textContent = "";
        nombreDeUsuarioError.textContent = "";

        let isFormValid = true;

        function validarEmail(email, usuarios) {
            let emailEncontrado = false;

            for (let i = 0; i < usuarios.length; i++) {
                if (email === usuarios[i].email) {
                    emailEncontrado = true;
                }
                break;
            }

            return emailEncontrado;
        }
        function validarNombreDeUsuario(nombreDeUsuario, usuarios) {
            let nombreDeUsuarioEncontrado = false;

            for (let i = 0; i < usuarios.length; i++) {
                if (nombreDeUsuario === usuarios[i].nombreDeUsuario) {
                    nombreDeUsuarioEncontrado = true;
                }
                break;
            }

            return nombreDeUsuarioEncontrado;
        }

        //Validar el email
        if (email === "") {
            emailError.textContent = MENSAJES_DE_ERROR.EMAIL;
            isFormValid = false;
        } else if (!EXPRESIONES_REGULARES.EMAIL.test(email)) {
            emailError.textContent = MENSAJES_DE_ERROR.EMAIL_INVALIDO;
            isFormValid = false;
        } else if (!validarEmail(email, usuarios)) {
            emailError.textContent = MENSAJES_DE_ERROR.EMAIL_NO_ENCONTRADO;
            isFormValid = false;
        }

        //Validar nombre de usuario
        if (nombreDeUsuario === "") {
            nombreDeUsuarioError.textContent = MENSAJES_DE_ERROR.NOMBRE_DE_USUARIO;
            isFormValid = false;
        } else if (!EXPRESIONES_REGULARES.LETRAS_Y_NUMEROS.test(nombreDeUsuario)) {
            nombreDeUsuarioError.textContent = MENSAJES_DE_ERROR.NOMBRE_DE_USUARIO_INVALIDO;
            isFormValid = false;
        } else if (!validarNombreDeUsuario(nombreDeUsuario, usuarios)) {
            nombreDeUsuarioError.textContent = MENSAJES_DE_ERROR.NOMBRE_DE_USUARIO_NO_ENCONTRADO;
            isFormValid = false;
        }

        if (isFormValid) {
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";

            setTimeout(function () {
                recuperarContraseñaForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar email";
                mensaje.textContent = "¡E-mail enviado exitosamente!";

                setTimeout(function () {
                    mensaje.textContent = "";
                }, 2000);
            }, 1000);
        }

    });
}
recuperarContraseña();