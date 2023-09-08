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
				name: `${'1'.green}. Crear tarea`,
			},
			{
				value: '2',
				name: `${'2'.green}. Listar tarea`,
			},
			{
				value: '3',
				name: `${'3'.green}. Listar tareas completadas`,
			},
			{
				value: '4',
				name: `${'4'.green}. Listar tareas pendientes`,
			},
			{
				value: '5',
				name: `${'5'.green}. Completar tarea(s)`,
			},
			{
				value: '6',
				name: `${'6'.green}. Borrar tarea`,
			},
			{
				value: '0',
				name: `${'0'.green}. Salir`,
			},
		],
	},
];

const enter = [
	{
		type: 'list',
		name: 'confirmar',
		message: `¿Esta seguro de salir? Presione ${'SI'.green} o ${'N0'.red}\n`,
		choices: [
			{
				value: 'si',
				name: 'SI',
			},
			{
				value: 'no',
				name: 'NO',
			},
		],
	},
];

const pregunta = [
	{
		type: 'input',
		name: 'continuar',
		message: `Presion ${'ENTER'.green} para continuar`,
	},
];

const inquirerMenu = async () => {
	console.clear();
	console.log('===================================='.green);
	console.log('        Seleccione una opción'.white);
	console.log('====================================\n'.green);

	const { opcion } = await inquirer.prompt(preguntas);

	return opcion;
};

const pausa = async () => {
	console.log('\n');
	await inquirer.prompt(pregunta);
};

const confirmacion = async () => {
	console.log('\n');
	const { confirmar } = await inquirer.prompt(enter);
	return confirmar;
};

const leerInput = async (message) => {
	const question = [
		{
			type: 'input',
			name: 'desc',
			message,
			validate(value) {
				if (value.length === 0) {
					return 'Por favor ingrese un valor';
				}
				return true;
			},
		},
	];

	const { desc } = await inquirer.prompt(question);
	return desc;
};

const listadoTareasBorrar = async (tareas = []) => {
	const choices = tareas.map((tarea, i) => {
		const index = `${i + 1}.`.green;
		return {
			value: tarea.id, // Aquí se establece el valor del ID de la tarea
			name: `${index} ${tarea.desc}`,
		};
	});

	const preguntas = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar',
			choices,
		},
	];

	const { id } = await inquirer.prompt(preguntas);

	return id;
};

module.exports = {
	confirmacion,
	inquirerMenu,
	leerInput,
	listadoTareasBorrar,
	pausa,
};
