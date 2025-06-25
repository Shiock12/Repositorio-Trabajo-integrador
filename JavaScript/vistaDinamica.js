/*document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-pelicula");
  const id = contenedor.dataset.id;  // Obtengo el id del data-id

  fetch('../../json/prueba.json')  // Ruta relativa a tu JSON
    .then(response => {
      if (!response.ok) throw new Error("Error cargando JSON");
      return response.json();
    })
    .then(data => {
      if (!data[id]) {
        contenedor.innerHTML = "<p>Película no encontrada</p>";
        return;
      }

      const peli = data[id];

      // Actualizo el título de la página
      document.title = peli.titulo;

      // Construyo el contenido dinámico
      contenedor.innerHTML = `
        <div class="pelicula-serie">
          <div class="iframe-a">
            <iframe src="${peli.video.src}" title="YouTube video player" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            <a href="${peli.video.url}" class="boton-comenzar" target="_blank">Comenzar</a>
          </div>
          <div class="detalle-pelicula-serie">
            <p><strong>Titulo:</strong> ${peli.titulo}</p>
            <p><strong>Duracion:</strong> ${peli.duracion}</p>
            <p><strong>Genero:</strong> ${peli.genero}</p>
            <p><strong>Actores:</strong> ${peli.actores.map(actor => `<a href="${actor.link}" target="_blank">${actor.nombre}</a>`).join(' - ')}</p>
            <p class="descripcion-pelicula-serie">${peli.descripcion}</p>
          </div>
        </div>
      `;
    })
    .catch(error => {
      console.error(error);
      contenedor.innerHTML = "<p>Error cargando datos</p>";
    });
});
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Obtener el parámetro id de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    if (!id) {
        alert('No se especificó ninguna película.');
        return;
    }

    // 2. Cargar el JSON (asegurate de que la ruta sea correcta)
    fetch('../../Json/peliculas.json')  // Ajusta esta ruta según dónde tengas el JSON
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el JSON');
            return response.json();
        })
        .then(data => {
            // 3. Buscar la película con ese id
            const pelicula = data.Peliculas.find(p => p.id === id);

            if (!pelicula) {
                alert('Película no encontrada.');
                return;
            }

            // 4. Inyectar datos en el HTML
            document.title = pelicula.titulo;  // Cambiar título de la pestaña

            // Título, duración, género, descripción
            document.getElementById('titulo').textContent = pelicula.titulo;
            document.getElementById('duracion').textContent = pelicula.duracion;
            document.getElementById('genero').textContent = pelicula.genero;
            document.getElementById('descripcion').textContent = pelicula.sinopsis;

            // Iframe (trailer)
            // Iframe (trailer) + botón "Comenzar"
            const iframeContainer = document.getElementById('iframe-container');
            iframeContainer.innerHTML = `<iframe width="560" height="315" src="${pelicula.iframe}" title="Trailer de ${pelicula.titulo}" frameborder="0" allowfullscreen></iframe><a href="${pelicula.video_link}" class="boton-comenzar" target="_blank" rel="noopener noreferrer">Comenzar</a>`;


            // Actores (con links a Wikipedia)
            const actoresCont = document.getElementById('actores');
            actoresCont.innerHTML = pelicula.actores.map(actor =>
                `<a href="${actor.wikipedia}" target="_blank" rel="noopener noreferrer">${actor.nombre}</a>`
            ).join(' - ');
        })
        .catch(error => {
            console.error('Error cargando los datos:', error);
            alert('Error al cargar la información de la película.');
        });
});
