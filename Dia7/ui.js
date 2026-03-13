import { menu, agregarPlato } from "./menu.js";

import {
    buscarPlatoPorNombre,
    filtrarStockBajo,
    obtenerResumenMenu,
    venderPlatoAsync,
    calcularEstadoPlato,
    verificarEstadoGeneral
} from "./operaciones.js";


export function renderMenu() {

    const output = document.getElementById("output");

    let html = "<ul>";

    for (let i = 0; i < menu.length; i++) {

        const plato = menu[i];

        const clase = calcularEstadoPlato(plato);

        html += `
<li class="${clase}">
${plato.nombre} - S/ ${plato.precio} - Stock: ${plato.stock}
</li>
`;

    }

    html += "</ul>";

    output.innerHTML = html;

    console.log(verificarEstadoGeneral());

}


function renderLista(titulo, listaDeTextos) {

    const output = document.getElementById("output");

    let html = `<h3>${titulo}</h3><ul>`;

    for (let i = 0; i < listaDeTextos.length; i++) {

        html += `<li>${listaDeTextos[i]}</li>`;

    }

    html += "</ul>";

    output.innerHTML = html;

}


function mostrarMensaje(texto, tipo) {

    const output = document.getElementById("output");

    let color = "black";

    if (tipo === "procesando") color = "blue";
    if (tipo === "exito") color = "green";
    if (tipo === "error") color = "red";

    output.innerHTML = `<p style="color:${color}">${texto}</p>`;

}


export function conectarEventos() {

    document
        .getElementById("btnMostrar")
        .addEventListener("click", renderMenu);


    document
        .getElementById("btnAgregar")
        .addEventListener("click", () => {

            agregarPlato({
                nombre: "Tallarines verdes",
                precio: 19,
                stock: 7
            });

            renderMenu();

        });


    document
        .getElementById("btnBuscar")
        .addEventListener("click", () => {

            const nombre = document.getElementById("inputBuscar").value;

            const plato = buscarPlatoPorNombre(nombre);

            if (plato) {

                renderLista("Resultado búsqueda", [
                    `${plato.nombre} - S/ ${plato.precio}`
                ]);

            } else {

                renderLista("Resultado búsqueda", ["No encontrado"]);

            }

        });


    document
        .getElementById("btnStockBajo")
        .addEventListener("click", () => {

            const lista = filtrarStockBajo();

            const textos = lista.map(p =>
                `${p.nombre} - Stock: ${p.stock}`
            );

            renderLista("Stock bajo", textos);

        });


    document
        .getElementById("btnResumen")
        .addEventListener("click", () => {

            const resumen = obtenerResumenMenu();

            renderLista("Resumen del menú", resumen);

        });


    document
        .getElementById("btnVender")
        .addEventListener("click", async () => {

            const nombre = document.getElementById("inputVender").value;

            const cantidad = parseInt(
                document.getElementById("inputCantidad").value
            );

            try {

                mostrarMensaje("Procesando pedido...", "procesando");

                const mensaje = await venderPlatoAsync(nombre, cantidad);

                mostrarMensaje(mensaje, "exito");

                renderMenu();

            } catch (error) {

                mostrarMensaje(error.message, "error");

            }

        });

}