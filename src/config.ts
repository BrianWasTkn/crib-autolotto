import Eris from 'eris'

const config: Eris.Lava.Config = {
	token: process.env.TOKEN,
	prefix: ['lotto', '>>', '??'],
	owners: ['605419747361947649'],
	lottery: {
		guild: '691416705917779999',
		channel: '717351680676462712',
		role: '692517500814098462',
		interval: 6 * 60 * 60 * 1000,
		rewards: {
			min: 250000,
			max: 2500000,
			cap: 3000000
		}
	},
	clientOptions: {
		maxReconnectAttempts: 3,
		defaultImageFormat: 'png',
		restMode: true,
		intents: [
			'guilds',
			'guildMessages',
			'guildMembers'
		]
	}
}

export default config;