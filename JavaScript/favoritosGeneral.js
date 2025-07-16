document.addEventListener("DOMContentLoaded", () => {
    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));
    if (!usuarioLogueado) {
        alert("Debes estar logueado para ver esta página.");
        window.location.href = "../../index.html";
        return;
    }

    const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || {};
    const favoritosDelUsuario = favoritosGuardados[usuarioLogueado.nombreDeUsuario] || [];

    const items = document.querySelectorAll(".galeria-Series-Peliculas a");

    items.forEach(item => {
        const img = item.querySelector("img");
        const idSerie = obtenerIdDesdeHref(item.href);

        // Crear el contenedor del corazón
        const heartIcon = document.createElement("span");
        heartIcon.classList.add("heart-icon");
        heartIcon.textContent = favoritosDelUsuario.includes(idSerie) ? "❤️" : "♡";
        heartIcon.style.position = "absolute";
        heartIcon.style.top = "5px";
        heartIcon.style.right = "5px";
        heartIcon.style.fontSize = "24px";
        heartIcon.style.cursor = "pointer";
        heartIcon.style.userSelect = "none";

        // Crear un contenedor relativo
        item.style.position = "relative";
        item.appendChild(heartIcon);

        // Manejar click
        heartIcon.addEventListener("click", (event) => {
            event.preventDefault(); // Evita navegar al link al hacer click en el corazón
            toggleFavorito(idSerie, heartIcon, usuarioLogueado);
        });
    });

    function obtenerIdDesdeHref(href) {
        const url = new URL(href, window.location.origin);
        return url.searchParams.get("id");
    }

    function toggleFavorito(id, heartIcon, usuario) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
    if (!favoritos[usuario.nombreDeUsuario]) {
        favoritos[usuario.nombreDeUsuario] = [];
    }
    const lista = favoritos[usuario.nombreDeUsuario];
    const index = lista.indexOf(id);

    if (index !== -1) {
        // Si ya está en favoritos, lo quitamos
        lista.splice(index, 1);
        heartIcon.textContent = "♡";  // Usamos el mismo símbolo sólido
        heartIcon.classList.remove('favorito');
    } else {
        // Si no está, lo agregamos
        lista.push(id);
        heartIcon.textContent = "❤️";
        heartIcon.classList.add('favorito');
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

});
