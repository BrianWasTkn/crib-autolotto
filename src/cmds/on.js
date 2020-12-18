import { Command } from '../struct/Command.js'

export default new Command({
	name: 'on', aliases: ['true', 'o'],
}, async ({ bot, msg }) => {
	bot.lottery.active.set('active', 1);
	return msg.channel.send(
		`Lottery is now \`${bot.lottery.active.get('active') === 1 ? 'on' : 'off'}\`
	`);
});