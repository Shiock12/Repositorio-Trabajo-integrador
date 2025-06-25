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

      const tieneCategoria = categoriaSeleccionada === "" || item.classList.contains(categoriaSeleccionada);
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
