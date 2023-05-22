require('colors');

const { mostrarMenu, pausa } = require('./helpers/mensajes');

console.clear();

const main = async () => {
    console.log('Hola Mundo')

    let opt = '';


    do {
        // se espera respuesta de Mostrar Menu y luego se guarda la salida de la función en opt.
        opt = await mostrarMenu();
        console.log({ opt });
        //si opt no es igual '0' entonces, se espera respuesta de pausa();
        if (opt !== '0') await pausa();
    } while (opt !== '0');

    // pausa();
}

main();