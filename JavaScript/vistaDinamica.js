
document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('No se especificó ninguna película.');
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

            // Iframe con trailer y boton
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.innerHTML = `<iframe width="560" height="315" src="${pelicula.iframe}" title="Trailer de ${pelicula.titulo}" frameborder="0" allowfullscreen></iframe><a href="${pelicula.video_link}" class="boton-comenzar" target="_blank" rel="noopener noreferrer">Comenzar</a>`;


            // Actores con links a Wikipedia
            const actoresCont = document.getElementById('actores');
            actoresCont.innerHTML = pelicula.actores.map(actor =>
                `<a href="${actor.wikipedia}" target="_blank" rel="noopener noreferrer">${actor.nombre}</a>`
            ).join(' - ');
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
            alert('Error al cargar la información de la película.');
        });
})