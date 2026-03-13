import { menu } from "./menu.js";


// ERROR
export class ErrorNegocio extends Error {

    constructor(mensaje) {
        super(mensaje);
        this.name = "ErrorNegocio";
    }

}


// BUSCAR
export function buscarPlatoPorNombre(nombre) {

    return menu.find(p =>
        p.nombre.toLowerCase() === nombre.toLowerCase()
    );

}


// FILTRAR
export function filtrarStockBajo(limite = 3) {

    return menu.filter(p =>
        p.stock <= limite
    );

}


// RESUMEN
export function obtenerResumenMenu() {

    return menu.map(p =>
        `${p.nombre} - S/ ${p.precio}`
    );

}


// ESTADO
export function calcularEstadoPlato(plato) {

    if (plato.stock === 0) return "agotado";

    if (plato.stock <= 3) return "bajo";

    return "normal";

}


// ESTADO GENERAL
export function verificarEstadoGeneral() {

    let agotados = 0;
    let bajos = 0;

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].stock === 0) agotados++;
        else if (menu[i].stock <= 3) bajos++;

    }

    if (agotados > 0) return "Hay platos agotados";

    if (bajos > 0) return "Hay platos con stock bajo";

    return "Todo disponible";

}


// VENTA
function venderPlato(nombre, cantidad) {

    const plato = buscarPlatoPorNombre(nombre);

    if (!plato) {
        throw new ErrorNegocio("El plato no existe");
    }

    if (cantidad <= 0) {
        throw new ErrorNegocio("Cantidad inválida");
    }

    if (plato.stock === 0) {
        throw new ErrorNegocio("Plato agotado");
    }

    if (plato.stock < cantidad) {
        throw new ErrorNegocio("Stock insuficiente");
    }


    plato.stock -= cantidad;

    return `Venta realizada: ${plato.nombre} x${cantidad}`;

}


// SIMULACION
function simularRespuestaServidor(resultado) {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const falla = Math.random() < 0.3;

            if (falla) {

                reject(new Error("Falla del servidor de cocina"));

            } else {

                resolve(resultado);

            }

        }, 2000);

    });

}


// VENTA
export async function venderPlatoAsync(nombre, cantidad) {

    const resultado = venderPlato(nombre, cantidad);

    const respuesta = await simularRespuestaServidor(resultado);

    return respuesta;

}