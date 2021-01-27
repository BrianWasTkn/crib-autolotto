import chalk from 'chalk'

export default {
	info: (klass: string, message: any): void => {
		return console.log(
			chalk.whiteBright(`[${klass}]`), 
			chalk.cyanBright(message)
		);
	},
	error: (klass: string, message: any, error: Error, stack: boolean = false): void => {
		return console.log(
			chalk.whiteBright(`[${klass}]`), 
			chalk.cyanBright(message),
			stack ? chalk.whiteBright(error.stack) : chalk.redBright(error.message)
		);
	}
}