// Dia 3 - Arrays

let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche", precio: 22, stock: 4 },
    { nombre: "Ají de gallina", precio: 16, stock: 6 }
];

// Normalizar texto tildes, mayúsculas, espacios
function normalizarTexto(texto) {
    return texto
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// RENDER MENÚ - Dia 3 - Arrays
function renderMenu() {

    const output = document.getElementById("output");

    let html = "<ul>";

    for (let i = 0; i < menu.length; i++) {

        const plato = menu[i];
        let clase = "";

        if (plato.stock === 0) {
            clase = "agotado";
        }
        else if (plato.stock <= 3) {
            clase = "bajo";
        }
        else {
            clase = "normal";
        }

        html += `
        <li class="${clase}">
            ${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock}
        </li>`;
    }

    html += "</ul>";

    output.innerHTML = html;

    verificarEstadoGeneral();
}

// AGREGAR PLATO DEMO - Dia 3 - Arrays
function agregarPlatoDemo() {

    const nuevoPlato = {
        nombre: "Tallarines verdes",
        precio: 19,
        stock: 7
    };

    menu.push(nuevoPlato);

    renderMenu();
}

// BUSCAR PLATO - Dia 4 - Metodos
function buscarPlatoPorNombre(nombre) {

    const nombreNormal = normalizarTexto(nombre);

    const plato = menu.find(p =>
        normalizarTexto(p.nombre) === nombreNormal
    );

    let mensaje = "";
    if (plato) {
        mensaje = "Encontrado: " + plato.nombre;
    } else {
        mensaje = "No encontrado";
    }

    const resultadoDiv = document.getElementById("resultadoBusqueda");
    resultadoDiv.innerHTML = `<p><strong>${mensaje}</strong></p>`;
}

// FILTRAR STOCK BAJO - Dia 4 - Metodos
function filtrarStockBajo() {

    const resultado = menu.filter(p => p.stock <= 3);

    let texto = "Stock bajo:\n";

    resultado.forEach(p => {
        texto += p.nombre + " (" + p.stock + ")\n";
    });

    alert(texto);
}

// OBTENER RESUMEN - Dia 4 - Metodos
function obtenerResumenMenu() {

    const resumen = menu.map(p =>
        p.nombre + " - S/ " + p.precio
    );

    alert(resumen.join("\n"));
}

// VENDER PLATO - Dia 4 - Metodos
function venderPlato(nombre, cantidad) {

    const nombreNormal = normalizarTexto(nombre);

    const plato = menu.find(p =>
        normalizarTexto(p.nombre) === nombreNormal
    );

    if (!plato) {
        alert("Plato no existe");
        return;
    }

    if (plato.stock === 0) {
        alert("Plato no disponible");
        return;
    }

    if (plato.stock >= cantidad) {
        plato.stock -= cantidad;
        alert("Venta realizada");
    } else {
        alert("Stock insuficiente");
    }

    renderMenu();
}

// VERIFICAR ESTADO GENERAL - Dia 5 - 
function verificarEstadoGeneral() {
    let agotados = 0;
    let bajos = 0;

    for (let i = 0; i < menu.length; i++) {
        if (menu[i].stock === 0) {
            agotados++;
        } else if (menu[i].stock <= 3) {
            bajos++;
        }
    }

    let mensaje = "";
    if (agotados > 0) {
        mensaje = "Hay platos agotados";
    } else if (bajos > 0) {
        mensaje = "Hay platos con stock bajo";
    } else {
        mensaje = "Todo disponible";
    }

    const output = document.getElementById("output");
    output.innerHTML += `<p><strong>${mensaje}</strong></p>`;
}

// EVENTOS - Dia 3 - Arrays
document
    .getElementById("btnMostrar")
    .addEventListener("click", renderMenu);

document
    .getElementById("btnAgregar")
    .addEventListener("click", agregarPlatoDemo);

// EVENTOS - Dia 4 - Metodos
document
    .getElementById("btnBuscar")
    .addEventListener("click", () => {
        const nombre = document.getElementById("inputBuscar").value;
        buscarPlatoPorNombre(nombre);
    });

document
    .getElementById("btnStockBajo")
    .addEventListener("click", filtrarStockBajo);

document
    .getElementById("btnResumen")
    .addEventListener("click", obtenerResumenMenu);

document
    .getElementById("btnVender")
    .addEventListener("click", () => {
        const nombre = document.getElementById("inputVender").value;
        const cantidad = parseInt(document.getElementById("inputCantidad").value);
        venderPlato(nombre, cantidad);
    });