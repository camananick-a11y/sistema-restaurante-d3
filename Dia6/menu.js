// Dia 6 - Modularizacion
// Dia 3 - Arrays

export let menu = [
    { nombre: "Arroz con pollo", precio: 12, stock: 5 },
    { nombre: "Lomo saltado", precio: 18, stock: 3 },
    { nombre: "Sopa", precio: 8, stock: 10 },
    { nombre: "Ceviche", precio: 22, stock: 4 },
    { nombre: "Ají de gallina", precio: 16, stock: 6 }
];

export function agregarPlato(plato) {
    menu.push(plato);
}

export function actualizarStock(nombre, nuevoStock) {

    for (let i = 0; i < menu.length; i++) {

        if (menu[i].nombre.toLowerCase() === nombre.toLowerCase()) {
            menu[i].stock = nuevoStock;
            return true;
        }

    }

    return false;
}


