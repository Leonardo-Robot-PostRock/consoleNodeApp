require('colors');

const { inquirerMenu, pausa, confirmacion } = require('./helpers/inquirer');

console.clear();

const main = async () => {
    console.log('Hola Mundo')

    let opt = '';
    let confirmar = '';


    do {
        // se espera respuesta de inquirer Menu y luego se guarda la salida de la función en opt.
        opt = await inquirerMenu();
        //si opt no es igual '0' entonces, se espera respuesta de pausa();
        console.log({ opt });
        if (opt !== '0') {
            await pausa();
        }
        console.clear()
        if (opt === '0') {
            confirmar = await confirmacion();
        };
    } while (opt !== '0' || confirmar === 'no');
}

main();