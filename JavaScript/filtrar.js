  document.addEventListener("DOMContentLoaded", function () {
  const selectCategoria = document.getElementById("selectCategoria");
  const inputBusqueda = document.getElementById("inputBusqueda");
  const items = document.querySelectorAll(".galeria-Series-Peliculas a");

  function filtrar() {
    const categoriaSeleccionada = selectCategoria.value.toLowerCase();
    const textoBusqueda = inputBusqueda.value.toLowerCase();

    items.forEach(item => {
      const img = item.querySelector("img");
      const nombre = img.alt.toLowerCase();
      // Las clases están en la imagen
      const tieneCategoria = categoriaSeleccionada === "" || img.classList.contains(categoriaSeleccionada);
      const coincideBusqueda = nombre.includes(textoBusqueda);

      if (tieneCategoria && coincideBusqueda) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  selectCategoria.addEventListener("change", filtrar);
  inputBusqueda.addEventListener("input", filtrar);
});

  
  
  /*FIltrar peliculas por categorias

  document.addEventListener("DOMContentLoaded", function () {
    const selectCategoria = document.querySelector(".filtros-izquierda select");
    const items = document.querySelectorAll(".galeria-PantallaPrincipal a");

    selectCategoria.addEventListener("change", function () {
      const categoriaSeleccionada = this.value.toLowerCase();

      items.forEach(item => {
        if (categoriaSeleccionada === "") {
          item.style.display = "block"; 
          return;
        }
        if (item.classList.contains(categoriaSeleccionada)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
*/

  //FIltrar peliculas por nombre

  document.addEventListener("DOMContentLoaded", function () {
  const selectCategoria = document.querySelector(".filtros-izquierda select");
  const inputBuscador = document.querySelector(".buscar-nombre");
  const items = document.querySelectorAll(".galeria-PantallaPrincipal a");

  function filtrar() {
    const categoriaSeleccionada = selectCategoria.value.toLowerCase();
    const textoBusqueda = inputBuscador.value.toLowerCase();

    items.forEach(item => {
      const coincideCategoria =
        categoriaSeleccionada === "" || item.classList.contains(categoriaSeleccionada);


      const nombreItem = item.querySelector("img").alt.toLowerCase();

      const coincideBusqueda = nombreItem.includes(textoBusqueda);

      if (coincideCategoria && coincideBusqueda) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }

  selectCategoria.addEventListener("change", filtrar);
  inputBuscador.addEventListener("input", filtrar);
});