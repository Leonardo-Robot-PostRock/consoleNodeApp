require('colors');

const {
	confirm,
	confirmDelete,
	inquirerMenu,
	listDeleteTasks,
	pause,
	readInput,
	showChecklist,
} = require('./helpers/inquirer');
const { saveDB, readDB } = require('./helpers/saveFile');
const Tareas = require('./models/tasks');

console.clear();

const main = async () => {
	let opt = '';
	let confirmOption = '';
	const tasks = new Tareas();

	const todosDB = readDB();

	if (todosDB) {
		tasks.loadTasksFromArray(todosDB);
	}

	do {
		// se espera respuesta de inquirer Menu y luego se guarda la salida de la función en opt.
		opt = await inquirerMenu();

		switch (opt) {
			case '1':
				//crear opcion
				const desc = await readInput('Descripción: ');
				tasks.createTask(desc);
				break;

			case '2':
				tasks.completeList();
				break;

			case '3':
				tasks.listCompletedPending(true);
				break;

			case '4':
				tasks.listCompletedPending(false);
				break;

			case '5':
				const ids = await showChecklist(tasks.arrayListing);
				tasks.toggleCompleted(ids);
				break;

			case '6':
				const id = await listDeleteTasks(tasks.arrayListing);
				const ok = await confirmDelete('¿Está seguro?');

				if (id !== '0') {
					if (ok) {
						tasks.deleteTask(id);
						console.log('Tarea borrada');
					}
				}
				break;

			default:
				break;
		}

		saveDB(tasks.arrayListing);

		//si opt no es igual '0' entonces, se espera respuesta de pause();
		if (opt !== '0') {
			await pause();
		}
		console.clear();
		if (opt === '0') {
			confirmOption = await confirm();
		}
	} while (opt !== '0' || confirmOption === 'no');
};

main();
