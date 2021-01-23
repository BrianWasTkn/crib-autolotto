export default {
	randomNumber: function random(min: number, max: number): number {
		return Math.floor(Math.random() * (max - min + 1) + min);
	},
	sleep: function sleep(ms: number): Promise<number> {
		return new Promise((resolve: Function): NodeJS.Timeout => {
			return setTimeout((): number => {
				return resolve(ms);
			}, ms);
		})
	}
}