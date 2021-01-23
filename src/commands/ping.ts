import Command from '../structures/Command'

export default new Command(async ({ msg }) => {
	return msg.channel.createMessage('Pong')
}, {
	name: 'ping',
	triggers: ['pong'],
	userPerms: ['sendMessages']
});