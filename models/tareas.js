/**
 * _listado:
 *      { 'uuid:12343534-41232123-2': { id:12, desc:asd, completadoEn:92231 } }
 */

const Tarea = require("./tarea");

class Tareas {
    _listado = {};
    constructor() {
        this._listado = {};
    }

    crearTarea(desc = '') {
        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }
}

module.exports = Tareas;