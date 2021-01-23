import Eris from 'eris'

const config: Eris.Lava.Config = {
	token: process.env.TOKEN,
	prefix: ['lotto', '>>'],
	owners: ['605419747361947649'],
	lottery: {
		guild: '',
		channel: '',
		role: '',
		interval: 6 * 60 * 1000,
		rewards: {
			min: 100000,
			max: 500000,
			cap: 600001
		}
	},
	clientOptions: {
		restMode: true
	}
}

export default config;