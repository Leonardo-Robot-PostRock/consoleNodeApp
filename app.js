require('colors');

const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = () => {
    console.log('Hola Mundo')

    let opt = '';

    mostrarMenu();
    // do {
    //     mostrarMenu();
    // } while (opt !== 0)

    // pausa();
}

main();