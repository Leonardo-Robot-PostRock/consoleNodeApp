/**
 * _list:
 *      { 'uuid:12343534-41232123-2': { id:12, desc:asd, completeIn:92231 } }
 */

const Task = require('./task');
require('colors');

class Tasks {
	_list = {};

	constructor() {
		this._list = {};
	}

	deleteTask(id = '') {
		if (this._list[id]) {
			delete this._list[id];
		}
	}

	get arrayListing() {
		const list = [];

		// return Object.values(this._list) Esto es lo mismo;
		Object.keys(this._list).forEach((key) => {
			const task = this._list[key];
			list.push(task);
		});

		return list;
	}

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
			const { desc, completeIn } = task;
			const state = completeIn ? 'Completado'.green : 'Pendiente'.red;

			console.log(`${id} ${desc} :: ${state}`);
		});
	}

	listCompletedPending(completado) {
		let count = 0;
		this.arrayListing.filter((task) => {
			const { desc, completeIn } = task;
			const state = completeIn ? 'Completado'.green : 'Pendiente'.red;
			if (completado) {
				if (completeIn) {
					count += 1;
					completeIn &&
						console.log(`${(count + '.').green} ${desc} :: ${state}`);
				}
			} else {
				if (!completeIn) {
					count += 1;
					!completeIn &&
						console.log(`${(count + '.').green} ${desc} :: ${state}`);
				}
			}
		});
	}
}

module.exports = Tasks;
