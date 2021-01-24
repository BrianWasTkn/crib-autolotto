export default {
	info: (klass: string, message: any): void => {
		return console.log(`[${klass}]`, message);
	},
	error: (klass: string, message: any, error: Error, stack: boolean = false): void => {
		return console.log(`[${klass}]`, message, stack ? error.stack : error.message);
	}
}