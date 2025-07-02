document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('No se especificó ninguna película.');
        return;
    }

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuarioLogueado) {
        alert("Debes estar logueado para ver esta página.");
        window.location.href = "../../index.html"; // Redirigir al login
        return;
    }

    fetch('../../Json/peliculas.json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el JSON');
            return response.json();
        })
        .then(data => {
            // Buscar la película con ese id
            const pelicula = data.Peliculas.find(p => p.id === id);

            if (!pelicula) {
                alert('Película no encontrada.');
                return;
            }

            document.title = pelicula.titulo;

            // Título, duración, género, descripción
            document.getElementById('titulo').textContent = pelicula.titulo;
            document.getElementById('duracion').textContent = pelicula.duracion;
            document.getElementById('genero').textContent = pelicula.genero;
            document.getElementById('descripcion').textContent = pelicula.sinopsis;

            // Iframe con trailer y botones
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.innerHTML = `
                <iframe width="560" height="315" src="${pelicula.iframe}" title="Trailer de ${pelicula.titulo}" frameborder="0" allowfullscreen></iframe>
                <a href="${pelicula.video_link}" class="boton-comenzar" target="_blank" rel="noopener noreferrer">Comenzar</a>
                <button id="favButton" class="boton-comenzar fav-btn">
                    <span class="heart">♡</span> Agregar a favoritos
                </button>
            `;

            // Actores con links a Wikipedia
            const actoresCont = document.getElementById('actores');
            actoresCont.innerHTML = pelicula.actores.map(actor =>
                `<a href="${actor.wikipedia}" target="_blank" rel="noopener noreferrer">${actor.nombre}</a>`
            ).join(' - ');

            // Verificar si ya es favorito
            const favoritosGuardados = JSON.parse(localStorage.getItem("favoritos")) || {};
            const favoritosDelUsuario = favoritosGuardados[usuarioLogueado.nombreDeUsuario] || [];

            const favButton = document.getElementById('favButton');
            if (favoritosDelUsuario.includes(id)) {
                favButton.classList.add('active');
                favButton.querySelector('.heart').textContent = '❤️';
            }

            // Evento para agregar o quitar de favoritos
            favButton.addEventListener('click', function () {
                this.classList.toggle('active');
                const heart = this.querySelector('.heart');
                heart.textContent = this.classList.contains('active') ? '❤️' : '♡';

                // Leer y actualizar favoritos del usuario
                let favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};

                if (!favoritos[usuarioLogueado.nombreDeUsuario]) {
                    favoritos[usuarioLogueado.nombreDeUsuario] = [];
                }

                const lista = favoritos[usuarioLogueado.nombreDeUsuario];
                const index = lista.indexOf(id);

                if (this.classList.contains('active')) {
                    if (index === -1) lista.push(id);
                } else {
                    if (index !== -1) lista.splice(index, 1);
                }

                localStorage.setItem("favoritos", JSON.stringify(favoritos));
            });
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
            alert('Error al cargar la información de la película.');
        });
});
