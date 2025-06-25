document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('No se especificó ninguna serie.');
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

            document.title = serie.titulo; // Título en pestaña

            // Rellenar campos
            document.getElementById('titulo-texto').textContent = serie.titulo || '';
            document.getElementById('duracion').textContent = serie.duracion || 'N/A';
            document.getElementById('genero').textContent = serie.genero || '';
            document.getElementById('descripcion').textContent = serie.sinopsis || '';

            // Iframe + botón
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.innerHTML = `
                <iframe 
                    src="${serie.iframe}" 
                    title="Trailer de ${serie.titulo}" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowfullscreen>
                </iframe>
                <a href="${serie.video_link}" class="boton-comenzar" target="_blank" rel="noopener noreferrer">Comenzar</a>`;

            // Actores con guiones entre ellos
            const actoresCont = document.getElementById('actores');
            actoresCont.innerHTML = serie.actores.map((actor, index) => {
                let sep = index < serie.actores.length - 1 ? ' - ' : '';
                return `<a href="${actor.wikipedia}" target="_blank" rel="noopener noreferrer">${actor.nombre}</a>${sep}`;
            }).join('');
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
            alert('Error al cargar la información de la serie.');
        });
});
