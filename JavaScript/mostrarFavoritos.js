document.addEventListener("DOMContentLoaded", () => {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuarioLogueado) {
    alert("Debes iniciar sesión para ver tu perfil.");
    window.location.href = "../index.html";
    return;
  }

  const usernameElem = document.getElementById("username");
  if (usernameElem) {
    usernameElem.textContent = usuarioLogueado.nombreDeUsuario || usuarioLogueado.nombre;
  }

  const favoritos = JSON.parse(localStorage.getItem("favoritos")) || {};
  const favoritosDelUsuario = favoritos[usuarioLogueado.nombreDeUsuario] || [];

  Promise.all([
    fetch("../Json/peliculas.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar peliculas.json");
        return res.json();
      }),
    fetch("../Json/imgPeliculas.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar imgPeliculas.json");
        return res.json();
      }),
    fetch("../Json/imgSeries.json")
      .then(res => {
        if (!res.ok) throw new Error("No se pudo cargar imgSeries.json");
        return res.json();
      })
  ])
    .then(([datos, imagenesPeliculas, imagenesSeries]) => {
      const peliculasFavoritas = datos.Peliculas.filter(p => favoritosDelUsuario.includes(p.id));
      const seriesFavoritas = datos.Series.filter(s => favoritosDelUsuario.includes(s.id));

      const contPeliculas = document.getElementById("lista-peliculas-favoritas");
      const contSeries = document.getElementById("lista-series-favoritas");

      if (peliculasFavoritas.length === 0) {
        contPeliculas.innerHTML = "<p>No tienes películas favoritas aún.</p>";
      } else {
        contPeliculas.innerHTML = peliculasFavoritas.map(pelicula => {
          const imagen = imagenesPeliculas[pelicula.id] || "/Imagenes/default.jpg";
          return `
            <a href="./VIstaDinamicaPeliculas.html?id=${pelicula.id}" class="tarjeta-favorita">
              <img src="${imagen}" alt="${pelicula.titulo}">
              <p>${pelicula.titulo}</p>
            </a>`;
        }).join("");
      }

      if (seriesFavoritas.length === 0) {
        contSeries.innerHTML = "<p>No tienes series favoritas aún.</p>";
      } else {
        contSeries.innerHTML = seriesFavoritas.map(serie => {
          const imagen = imagenesSeries[serie.id] || "/Imagenes/default.jpg";
          return `
            <a href="./VistaDinamicaSeries.html?id=${serie.id}" class="tarjeta-favorita">
              <img src="${imagen}" alt="${serie.titulo}">
              <p>${serie.titulo}</p>
            </a>`;
        }).join("");
      }
    })
    .catch(error => {
      console.error("Error cargando los datos:", error);
      alert("Error al cargar las películas y series favoritas.");
    });
});
