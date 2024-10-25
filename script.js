// Variables
const carrito = document.querySelector('#carrito');
const listaCursos = document.querySelector('#lista-makeup');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
let articulosCarrito = [];

// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarMakeup);

     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarMakeup);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

}




// Funciones
// Función que añade el curso al carrito
function agregarMakeup(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if(e.target.classList.contains('agregar-carrito')) {
          const makeup = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosMakeup(makeup);
     }
}

// Lee los datos del curso
function leerDatosMakeup(makeup) {
     const infoMakeup = {
          imagen: makeup.querySelector('img').src,
          titulo: makeup.querySelector('h4').textContent,
          precio: makeup.querySelector('.precio').textContent,
          id: makeup.querySelector('a').getAttribute('data-id'), 
          cantidad: 1
     }


     if( articulosCarrito.some( makeup => makeup.id === infoMakeup.id ) ) { 
          const makeup = articulosCarrito.map( makeup => {
               if( makeup.id === infoMakeup.id ) {
                    makeup.cantidad++;
                     return makeup;
                } else {
                     return makeup;
             }
          })
          articulosCarrito = [...makeup];
     }  else {
          articulosCarrito = [...articulosCarrito, infoMakeup];
     }

     // console.log(articulosCarrito)

     

     // console.log(articulosCarrito)
     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarMakeup(e) {
     e.preventDefault();
     if(e.target.classList.contains('borrar-curso') ) {
          // e.target.parentElement.parentElement.remove();
          const cursoId = e.target.getAttribute('data-id')
          
          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td class="text-center">${curso.precio}</td>
               <td class="text-center">${curso.cantidad} </td>
               <td>
                    <a href="#" class="text-pink-700 hover:text-pink-900 borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma lenta
     // contenedorCarrito.innerHTML = '';


     // forma rapida (recomendada)
     while(contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}