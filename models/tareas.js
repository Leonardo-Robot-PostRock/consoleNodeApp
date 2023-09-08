/**
 * _listado:
 *      { 'uuid:12343534-41232123-2': { id:12, desc:asd, completadoEn:92231 } }
 */

const Tarea = require('./tarea');

class Tareas {
	_listado = {};

	get listadoArr() {
		const listado = [];

		// return Object.values(this._listado) Esto es lo mismo;
		Object.keys(this._listado).forEach((key) => {
			const tarea = this._listado[key];
			listado.push(tarea);
		});

		return listado;
	}

	constructor() {
		this._listado = {};
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
}

module.exports = Tareas;
