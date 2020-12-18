import { Command } from '../struct/Command.js'

export default new Command({
	name: 'off', aliases: ['false', 'f'],
}, async ({ bot, msg }) => {
	bot.lottery.active.set('active', 0);
	return msg.channel.send(
		`Lottery is now \`${bot.lottery.active.get('active') === 0 ? 'off' : 'on'}\`
	`);
});