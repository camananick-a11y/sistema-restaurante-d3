// ARRAY DE OBJETOS (mínimo 5 platos)
let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche", precio: 22, stock: 4 },
    { nombre: "Ají de gallina", precio: 16, stock: 6 }
];

// FUNCIÓN renderizar menú
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

// FUNCIÓN agregar plato demo
function agregarPlatoDemo() {
    const nuevoPlato = {
        nombre: "Tallarines verdes",
        precio: 19,
        stock: 7
    };

    menu.push(nuevoPlato);
}

// FUNCIÓN contar platos
function contarPlatos() {
    return menu.length;
}

// EVENTOS
document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
});

document.getElementById("btnAgregar").addEventListener("click", () => {
    agregarPlatoDemo();
    renderMenu();
});