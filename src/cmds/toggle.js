import { Command } from '../struct/Command.js'

export default new Command({
	name: 'toggle', aliases: ['toggle'],
}, async ({ bot, msg }) => {
	let prev = bot.lottery.active.get('active');
	bot.lottery.active.set('active', prev === 1 ? 0 : 1);
	return msg.channel.send(
		`Lottery is now \`${bot.lottery.active.get('active') === 0 ? 'off' : 'on'}\`
	`);
});