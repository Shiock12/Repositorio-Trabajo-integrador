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

//Validar contraseñas coincidan
if(contraseña !== repetirContraseña){
    alert("Las contraseñas no coinciden");
    return;
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