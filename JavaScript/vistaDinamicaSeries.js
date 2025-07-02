document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('No se especificó ninguna serie.');
        return;
    }

    const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

    if (!usuarioLogueado) {
        alert("Debes estar logueado para ver esta página.");
        window.location.href = "../../index.html";
        return;
    }

    fetch('../../Json/peliculas.json')
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el JSON');
            return response.json();
        })
        .then(data => {
            const serie = data.Series.find(p => p.id === id);

            if (!serie) {
                alert('Serie no encontrada.');
                return;
            }

            document.title = serie.titulo;

            // Rellenar campos
            document.getElementById('titulo-texto').textContent = serie.titulo || '';
            document.getElementById('duracion').textContent = serie.duracion || 'N/A';
            document.getElementById('genero').textContent = serie.genero || '';
            document.getElementById('descripcion').textContent = serie.sinopsis || '';

            // Iframe + botones
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.innerHTML = `
                <iframe 
                    src="${serie.iframe}" 
                    title="Trailer de ${serie.titulo}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                <a href="${serie.video_link}" class="boton-comenzar" target="_blank" rel="noopener noreferrer">Comenzar</a>
                <button id="favButton" class="boton-comenzar fav-btn">
                    <span class="heart">♡</span> Agregar a favoritos
                </button>
            `;

            // Actores
            const actoresCont = document.getElementById('actores');
            actoresCont.innerHTML = serie.actores.map((actor, index) => {
                let sep = index < serie.actores.length - 1 ? ' - ' : '';
                return `<a href="${actor.wikipedia}" target="_blank" rel="noopener noreferrer">${actor.nombre}</a>${sep}`;
            }).join('');

            // Verificar si ya es favorita
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
            alert('Error al cargar la información de la serie.');
        });
});
