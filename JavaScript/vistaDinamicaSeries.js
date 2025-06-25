document.addEventListener('DOMContentLoaded', () => {
    //Obtiene el parámetro id de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('No se especificó ninguna serie.');
        return;
    }

    // Cargar el JSON 
    fetch('../../Json/peliculas.json') 
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el JSON');
            return response.json();
        })
        .then(data => {
            // Buscar la serie con ese id
            const serie = data.Series.find(p => p.id === id);

            if (!serie) {
                alert('Serie no encontrada.');
                return;
            }

            // Crea datos en el HTML
            document.title = serie.titulo;  // Cambiar título de la pestaña

            // Título, duración, género, descripción
            document.getElementById('titulo').textContent = serie.titulo;
            document.getElementById('duracion').textContent = serie.duracion;
            document.getElementById('genero').textContent = serie.genero;
            document.getElementById('descripcion').textContent = serie.sinopsis;

            // Iframe con trailer y botón "Comenzar"
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.innerHTML = `<iframe width="560" height="315" src="${serie.iframe}" title="Trailer de ${serie.titulo}" frameborder="0" allowfullscreen></iframe><a href="${serie.video_link}" class="boton-comenzar" target="_blank" rel="noopener noreferrer">Comenzar</a>`;


            // Actores con links a Wikipedia
            const actoresCont = document.getElementById('actores');
            actoresCont.innerHTML = serie.actores.map(actor =>
                `<a href="${actor.wikipedia}" target="_blank" rel="noopener noreferrer">${actor.nombre}</a>`
            ).join(' - ');
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
            alert('Error al cargar la información de la serie.');
        });
});
