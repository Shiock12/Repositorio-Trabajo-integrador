console.log("Hola asdsa");

const usernameinput = document.getElementById("User");
const passwordinput = document.getElementById("password");
const botonlogin = document.getElementById("boton-login");

// Función para habilitar/deshabilitar el botón
function verificarCampos() {
    const usuario = usernameinput.value.trim();
    const password = passwordinput.value.trim();
    botonlogin.disabled = !(usuario && password);
}

usernameinput.addEventListener("input", verificarCampos);
passwordinput.addEventListener("input", verificarCampos);

// Agregamos la validación del usuario al enviar el formulario
document.querySelector("form").addEventListener("submit", function (event) {
    event.preventDefault(); // No enviar formulario

    const usuario = usernameinput.value.trim();
    const contraseña = passwordinput.value.trim();

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuarioEncontrado = usuarios.find(u => u.nombreDeUsuario === usuario && u.contraseña === contraseña);

    //Se muestra en perfil
    if (usuarioEncontrado) {
        // Guardar al usuario logueado para usarlo después si querés
        localStorage.setItem("usuarioLogueado", JSON.stringify(usuarioEncontrado));
        window.location.href = "./Vistas/PantallaPrincipal.html"; // Redirigir a vista principal
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});
