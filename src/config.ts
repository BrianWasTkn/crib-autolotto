import Eris from 'eris'

const config: Eris.Lava.Config = {
	token: process.env.TOKEN,
	prefix: ['lotto', '>>', '??'],
	owners: ['605419747361947649'],
	lottery: {
		guild: '691416705917779999',
		channel: '692527636676739072',
		role: '692517500814098462',
		interval: 1 * 5 * 1000,
		rewards: {
			min: 250000,
			max: 2500000,
			cap: 3000000
		}
	},
	clientOptions: {
		defaultImageFormat: 'png',
		autoreconnect: false,
		restMode: true,
		intents: [
			'guilds',
			'guildMessages',
			'guildMembers'
		]
	}
}

export default config;