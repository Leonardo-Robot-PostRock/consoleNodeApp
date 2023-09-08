require('colors');

const {
	inquirerMenu,
	pausa,
	confirmacion,
	leerInput,
	listadoTareasBorrar,
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tareas = require('./models/tareas');

console.clear();

const main = async () => {
	let opt = '';
	let confirmar = '';
	const tareas = new Tareas();

	const todosDB = readDB();

	if (todosDB) {
		tareas.cargarTareasFromArr(todosDB);
	}

	do {
		// se espera respuesta de inquirer Menu y luego se guarda la salida de la función en opt.
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				//crear opcion
				const desc = await leerInput('Descripción: ');
				tareas.crearTarea(desc);
				break;
			case '2':
				tareas.listadoCompleto();
				break;
			case '3':
				tareas.listarCompletadasPendientes(true);
				break;
			case '4':
				tareas.listarCompletadasPendientes(false);
				break;
			case '6':
				const id = await listadoTareasBorrar(tareas.listadoArr);
				console.log({ id });
				break;
			default:
				break;
		}

		saveDB(tareas.listadoArr);

		//si opt no es igual '0' entonces, se espera respuesta de pausa();
		if (opt !== '0') {
			await pausa();
		}
		console.clear();
		if (opt === '0') {
			confirmar = await confirmacion();
		}
	} while (opt !== '0' || confirmar === 'no');
};

main();
