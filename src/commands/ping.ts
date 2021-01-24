import Command from '../structures/Command'
import * as colors from '../structures/colors'
import Eris from 'eris'

export default new Command(async ({ Bot, msg }: Eris.Lava.CommandFuncParams): Promise<Eris.EmbedOptions> => {
	return {
		color: colors.orange,
		title: msg.channel.guild.name,
		description: [
			`**Shard ID:** ${msg.channel.guild.shard.id}`,
			`**Latency:** \`${msg.channel.guild.shard.latency}ms\``,
			`**Websocket:** \`${Bot.shards.get(msg.channel.guild.shard.id).latency}ms\``,
		].join('\n'),
		timestamp: new Date(),
		footer: {
			icon_url: Bot.user.dynamicAvatarURL(),
			text: Bot.user.username
		}
	}
}, {
	name: 'ping',
	triggers: ['pong'],
	userPerms: ['sendMessages']
});