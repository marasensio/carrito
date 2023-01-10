
//variables
let productos = document.querySelector('.products');
let items = document.querySelector('.card-items');
let precio_total = document.querySelector('.price-total')
let cantidad_productos = document.querySelector('.count-product');


let carrito = [];
let total = 0;
let cantidad_items = 0;

//funciones
productos.addEventListener('click', agregar_producto);
items.addEventListener('click', borrar_producto);

// Agregar producto al carrito
function agregar_producto(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {
        const selecciona_producto = e.target.parentElement; 
        leer_contenido(selecciona_producto);
    }
}

function leer_contenido(producto){
    const infoProducto = {
        imagen: producto.querySelector('div img').src,
        descripcion: producto.querySelector('.title').textContent,
        precio: producto.querySelector('div p span').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
// Acumulo total de la compra
    total = parseFloat(total) + parseFloat(infoProducto.precio);
    total = total.toFixed(2);
// Verifica si el producto ya fue seleccionado y lo incrementa
// Uso de funciones flecha
    const existe = carrito.some(producto => producto.id === infoProducto.id);
    if (existe) {
        const pro = carrito.map(producto => {
            if (producto.id === infoProducto.id) {
                producto.cantidad++;
                return producto;
            } else {
                return producto
            }
        });
        // uso del operador spread
        carrito = [...pro];
    } else {
        carrito = [...carrito, infoProducto]
        cantidad_items++;
    }
    cargar_Html();
    
}


// Quita un producto del carrito y recalcula el total
function borrar_producto(e) {
    if (e.target.classList.contains('delete-product')) {
        const borra_id = e.target.getAttribute('data-id');

        carrito.forEach(valor => {
            if (valor.id == borra_id) {
                let subtotal = parseFloat(valor.precio) * parseFloat(valor.cantidad);
                total =  total - subtotal;
                total = total.toFixed(2);
            }
        });
        carrito = carrito.filter(producto => producto.id !== borra_id);
        
        cantidad_items--;
    }
    
    if (carrito.length === 0) {
        precio_total.innerHTML = 0;
        cantidad_productos.innerHTML = 0;
    }
    cargar_Html();
}
// Actualiza el contenido de la cart-products
function cargar_Html(){
    borrar_Html();
    carrito.forEach(producto => {
        const {imagen, descripcion, precio, cantidad, id} = producto;
        const row = document.createElement('div');
        row.classList.add('item');
        row.innerHTML = `
            <img src="${imagen}" alt="">
            <div class="item-content">
                <h5>${descripcion}</h5>
                <h5 class="cart-price">$ ${precio}</h5>
                <h6>Cantidad: ${cantidad}</h6>
            </div>
            <span class="delete-product" data-id="${id}">X</span>
        `;
        
        

        precio_total.innerHTML = total;

        cantidad_productos.innerHTML = cantidad_items;
        // Agregar el carrito de compras al storage
        localStorage.setItem('.card-items', JSON.stringify(carrito));
        items.appendChild(row);
    });
}

function borrar_Html(){
    items.innerHTML = '';
    

}
// Cuando haga click en el carrito me muestra la cart-products
function showCart(x){
    document.getElementById("products-id").style.display = "block";
}
// Cierro la cart-products
function closeBtn(){
    document.getElementById("products-id").style.display = "none";
}

// Muestra los cursos de Local Storage
/*Se podría hacer que se mantengan guardados los productos del carrito aunque actulicemos el 
browser usando las siguientes líneas
document.addEventListener('DOMContentLoaded', () => {
    carrito = JSON.parse( localStorage.getItem('.card-items') ) || [];

    cargar_Html();
})*/
