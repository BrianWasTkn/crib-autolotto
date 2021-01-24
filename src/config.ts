import Eris from 'eris'

const config: Eris.Lava.Config = {
	token: process.env.TOKEN,
	prefix: ['lotto', '>>'],
	owners: ['605419747361947649'],
	lottery: {
		guild: '691416705917779999',
		channel: '692527636676739072',
		role: '692517500814098462',
		interval: 1 * 60 * 1000,
		rewards: {
			min: 1e3,
			max: 1e100,
			cap: 3e100
		}
	},
	clientOptions: {
		restMode: true,
		intents: [
			'guilds',
			'guildMessages',
			'guildMembers'
		]
	}
}

export default config;