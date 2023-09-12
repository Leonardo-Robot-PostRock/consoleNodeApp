const inquirer = require('inquirer');
require('colors');

//Elegir operación a realizar

const questions = [
	{
		type: 'list',
		name: 'option',
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

//Opciones para salir de la app

const enterConfirmOption = [
	{
		type: 'list',
		name: 'confirmOption',
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

//continuar la operación

const question = [
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

	const { option } = await inquirer.prompt(questions);

	return option;
};

const pause = async () => {
	console.log('\n');
	await inquirer.prompt(question);
};

const confirm = async () => {
	console.log('\n');
	const { confirmOption } = await inquirer.prompt(enterConfirmOption);
	return confirmOption;
};

const readInput = async (message) => {
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

const listDeleteTasks = async (tasks = []) => {
	const choices = tasks.map((task, i) => {
		const index = `${i + 1}.`.green;

		return {
			value: task.id, // Aquí se establece el valor del ID de la task
			name: `${index} ${task.desc}`,
		};
	});

	choices.unshift({
		value: '0',
		name: '0'.green + ' Cancelar',
	});

	const questions = [
		{
			type: 'list',
			name: 'id',
			message: 'Borrar',
			choices,
		},
	];

	const { id } = await inquirer.prompt(questions);

	return id;
};

const confirmDelete = async (message) => {
	const question = [
		{
			type: 'confirm',
			name: 'ok',
			message,
		},
	];

	const { ok } = await inquirer.prompt(question);
	return ok;
};

module.exports = {
	confirm,
	confirmDelete,
	inquirerMenu,
	readInput,
	listDeleteTasks,
	pause,
};
