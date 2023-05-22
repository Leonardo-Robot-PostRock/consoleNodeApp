const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tarea'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tarea(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            },
        ]
    }
]

const enter = [
    {
        type: 'list',
        name: 'confirmar',
        message: `¿Esta seguro de salir? Presione ${'SI'.green} o ${'N0'.red}\n`,
        choices: [
            {
                value: 'si',
                name: 'SI'
            },
            {
                value: 'no',
                name: 'NO'
            }
        ]
    }
]

const pregunta = [
    {
        type: 'input',
        name: 'continuar',
        message: `Presion ${'ENTER'.green} para continuar`,
    }
]

const inquirerMenu = async () => {
    console.clear();
    console.log('===================================='.green);
    console.log('Seleccione una opción'.green);
    console.log('====================================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt(pregunta)
}

const confirmacion = async () => {
    console.log('\n');
    const { confirmar } = await inquirer.prompt(enter)
    return confirmar;
}

module.exports = {
    inquirerMenu,
    pausa,
    confirmacion
}