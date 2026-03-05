// Dia 3 - Arrays

// ARRAY DE OBJETOS 
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche", precio: 22, stock: 4 },
    { nombre: "Ají de gallina", precio: 16, stock: 6 }
];


// RENDER MENÚ - Dia 3 - Arrays
function renderMenu() {
    const output = document.getElementById("output");
    output.innerHTML = "";

    let html = "<ul>";

    for (let i = 0; i < menu.length; i++) {
        const plato = menu[i];
        html += `<li>${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
    }

    html += "</ul>";
    html += `<p>Total de platos en el menú: ${contarPlatos()}</p>`;

    output.innerHTML = html;
}


// FUNCIÓN PARA LISTAS - Dia 4 - Metodos
function renderLista(titulo, listaDeTextos) {
    const output = document.getElementById("output");

    let html = `<h3>${titulo}</h3><ul>`;

    for (let i = 0; i < listaDeTextos.length; i++) {
        html += `<li>${listaDeTextos[i]}</li>`;
    }

    html += "</ul>";

    output.innerHTML = html;
}


// AGREGAR PLATO DEMO - Dia 3 - Arrays
function agregarPlatoDemo() {
    const nuevoPlato = {
        nombre: "Tallarines verdes",
        precio: 19,
        stock: 7
    };

    menu.push(nuevoPlato);
}


// CONTAR PLATOS - Dia 3 - Arrays
function contarPlatos() {
    return menu.length;
}


// BUSCAR PLATO - Dia 4 - Metodos
function buscarPlatoPorNombre(nombre) {

    const plato = menu.find(p =>
        p.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (!plato) {
        renderLista("Resultado búsqueda", ["No encontrado"]);
        return;
    }

    const texto = `${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}`;

    renderLista("Resultado búsqueda", [texto]);
}


// FILTRAR STOCK BAJO - Dia 4 - Metodos
function filtrarStockBajo() {

    const platosFiltrados = menu.filter(p => p.stock <= 3);

    if (platosFiltrados.length === 0) {
        renderLista("Stock bajo", ["No hay platos con stock bajo"]);
        return;
    }

    const listaTextos = platosFiltrados.map(p =>
        `${p.nombre} — Stock: ${p.stock}`
    );

    renderLista("Stock bajo", listaTextos);
}


// RESUMEN DEL MENÚ - Dia 4 - Metodos
function obtenerResumenMenu() {

    const resumen = menu.map(p =>
        `${p.nombre} — S/ ${p.precio}`
    );

    renderLista("Resumen del menú", resumen);
}


// VENDER PLATO - Dia 4 - Metodos
function venderPlato(nombre, cantidad) {

    const plato = menu.find(p =>
        p.nombre.toLowerCase() === nombre.toLowerCase()
    );

    const output = document.getElementById("output");

    if (!plato) {
        output.innerHTML = "<p>Plato no existe</p>";
        return;
    }

    if (plato.stock < cantidad) {
        output.innerHTML = "<p>Stock insuficiente</p>";
        return;
    }

    plato.stock -= cantidad;

    output.innerHTML = `<p>Venta realizada: ${cantidad} ${plato.nombre}</p>`;

    renderMenu();
}


// EVENTOS - Dia 3 - Arrays
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});

// EVENTOS - Dia 4 - Metodos
document.getElementById("btnBuscar").addEventListener("click", () => {
    const valor = document.getElementById("inputBuscar").value;
    buscarPlatoPorNombre(valor);
});

document.getElementById("btnStockBajo").addEventListener("click", () => {
    filtrarStockBajo();
});

document.getElementById("btnResumen").addEventListener("click", () => {
    obtenerResumenMenu();
});

document.getElementById("btnConfirmarVenta").addEventListener("click", () => {

    const nombre = document.getElementById("inputNombreVenta").value;
    const cantidad = parseInt(document.getElementById("inputCantidadVenta").value);

    if (!nombre || isNaN(cantidad)) {
        alert("Datos inválidos");
        return;
    }

    venderPlato(nombre, cantidad);
});