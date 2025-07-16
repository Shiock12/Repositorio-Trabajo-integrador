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
        const idSerie = obtenerIdDesdeHref(item.href);

        // Crear el contenedor del corazón
        const heartIcon = document.createElement("span");
        heartIcon.classList.add("heart-icon");

        if (favoritosDelUsuario.includes(idSerie)) {
            heartIcon.textContent = "❤️";
            heartIcon.classList.add('favorito'); 
        } else {
            heartIcon.textContent = "♡";
        }

        item.style.position = "relative";
        item.appendChild(heartIcon);

        // Manejar click
        heartIcon.addEventListener("click", (event) => {
            event.preventDefault(); 
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
            lista.splice(index, 1);
            heartIcon.textContent = "♡";
            heartIcon.classList.remove('favorito');
        } else {
            lista.push(id);
            heartIcon.textContent = "❤️";
            heartIcon.classList.add('favorito');
        }

        localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
});
