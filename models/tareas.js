/**
 * _listado:
 *      { 'uuid:12343534-41232123-2': { id:12, desc:asd, completadoEn:92231 } }
 */

const Tarea = require('./tarea');
require('colors');

class Tareas {
	_listado = {};

	constructor() {
		this._listado = {};
	}

	borrarTarea(id = '') {
		if (this._listado[id]) {
			delete this._listado[id];
		}
	}

	get listadoArr() {
		const listado = [];

		// return Object.values(this._listado) Esto es lo mismo;
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	cargarTareasFromArr = (tareas = []) => {
		tareas.forEach((tarea) => {
			this._listado[tarea.id] = tarea;
		});
	};

	crearTarea(desc = '') {
		const tarea = new Tarea(desc);
		this._listado[tarea.id] = tarea;
	}

	listadoCompleto() {
		// Todo:
		//1. Alma :: Completada | Pendiente
		//2. Realidad :: Completada | Pendiente
		//3. Poder :: Completada | Pendiente

		this.listadoArr.forEach((tarea, i) => {
			const id = `${i + 1}.`.green;
			const { desc, completadoEn } = tarea;
			const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;

			console.log(`${id} ${desc} :: ${estado}`);
		});
	}

	listarCompletadasPendientes(completado) {
		let contador = 0;
		this.listadoArr.filter((tarea) => {
			const { desc, completadoEn } = tarea;
			const estado = completadoEn ? 'Completado'.green : 'Pendiente'.red;
			if (completado) {
				if (completadoEn) {
					contador += 1;
					completadoEn &&
						console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
				}
			} else {
				if (!completadoEn) {
					contador += 1;
					!completadoEn &&
						console.log(`${(contador + '.').green} ${desc} :: ${estado}`);
				}
			}
		});
	}
}

module.exports = Tareas;
