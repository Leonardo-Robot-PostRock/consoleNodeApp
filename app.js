require('colors');

const { inquirerMenu, pausa, confirmacion, leerInput } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
    console.log('Hola Mundo')

    let opt = '';
    let confirmar = '';
    const tareas = new Tareas();

    do {
        // se espera respuesta de inquirer Menu y luego se guarda la salida de la función en opt.
        opt = await inquirerMenu();
        //si opt no es igual '0' entonces, se espera respuesta de pausa();

        switch (opt) {
            case '1':
                //crear opcion               
                const desc = await leerInput('Descripción: ');
                tareas.crearTarea(desc);
                break;
            case '2':
                console.log(tareas._listado);

            default:
                break;
        }

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