/**
 * _list:
 *      { 'uuid:12343534-41232123-2': { id:12, desc:asd, completedIn:92231 } }
 */

const Task = require('./task');
require('colors');

class Tasks {
	_list = {};

	constructor() {
		this._list = {};
	}

	// Borrar tarea
	deleteTask(id = '') {
		if (this._list[id]) {
			delete this._list[id];
		}
	}

	//Obtener listado de array
	get arrayListing() {
		const list = [];

		// return Object.values(this._list) Esto es lo mismo;
		Object.keys(this._list).forEach((key) => {
			const task = this._list[key];
			list.push(task);
		});

		return list;
	}

	//Cargar tareas desde array
	loadTasksFromArray = (tasks = []) => {
		tasks.forEach((task) => {
			this._list[task.id] = task;
		});
	};

	createTask(desc = '') {
		const task = new Task(desc);
		this._list[task.id] = task;
	}

	completeList() {
		// Todo:
		//1. Alma :: Completada | Pendiente
		//2. Realidad :: Completada | Pendiente
		//3. Poder :: Completada | Pendiente

		this.arrayListing.forEach((task, i) => {
			const id = `${i + 1}.`.green;
			const { desc, completedIn } = task;
			const state = completedIn ? 'Completado'.green : 'Pendiente'.red;

			console.log(`${id} ${desc} :: ${state}`);
		});
	}

	listCompletedPending(completado) {
		let count = 0;
		this.arrayListing.filter((task) => {
			const { desc, completedIn } = task;
			const state = completedIn ? 'Completado'.green : 'Pendiente'.red;
			if (completado) {
				if (completedIn) {
					count += 1;
					console.log(`${(count + '.').green} ${desc} :: ${completedIn.green}`);
				}
			} else {
				if (!completedIn) {
					count += 1;
					console.log(`${(count + '.').green} ${desc} :: ${state}`);
				}
			}
		});
	}

	toggleCompleted(ids = []) {
		ids.forEach((id) => {
			const task = this._list[id];
			if (!task.completedIn) {
				task.completedIn = new Date().toISOString();
			}
		});

		// Eliminar las tareas que no esten completadas
		this.arrayListing.forEach((task) => {
			if (!ids.includes(task.id)) {
				this._list[task.id].completedIn = null;
				// const task = this._list[id];
				// task.completedIn = null;
			}
		});
	}
}

module.exports = Tasks;
