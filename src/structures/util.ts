export default {
	randomNumber: function NumberRandom(min: number = 1, max: number = 100): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	randomInArray: function ArrayRandom(array: any[]): any {
		return array[Math.floor(Math.random() * array.length)];
	},
	sleep: function ProimiseSleep(ms: number = 1000): Promise<number> {
		return new Promise((resolve: Function): NodeJS.Timeout => {
			return setTimeout((): number => {
				return resolve(ms);
			}, ms);
		})
	}
}