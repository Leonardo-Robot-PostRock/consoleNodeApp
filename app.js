require('colors');

const { inquirerMenu } = require('./helpers/inquirer');

console.clear();

const main = async () => {
    console.log('Hola Mundo')

    let opt = '';


    do {
        // se espera respuesta de Mostrar Menu y luego se guarda la salida de la función en opt.
        opt = await inquirerMenu();
        console.log({ opt });
        //si opt no es igual '0' entonces, se espera respuesta de pausa();

    } while (opt !== '0');

    // pausa();
}

main();