  //FIltrar peliculas por categorias

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