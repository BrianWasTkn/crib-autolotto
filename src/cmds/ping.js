import { Command } from '../struct/Command.js'

export default new Command({
	name: 'ping', aliases: ['pong'],
}, async ({ bot, msg }) => {
	await msg.channel.send([
		'**__:ping_pong: Pong__**',
		`**Shard ${msg.guild.shard.id}:**\`${msg.guild.shard.ping}ms\``
	].join('\n'));
});