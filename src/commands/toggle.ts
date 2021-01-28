import Command from '../structures/Command'
import * as colors from '../structures/colors'
import { Lava, Message, GuildTextableChannel, EmbedOptions } from 'eris'
import { inspect } from 'util'

export default new Command({
	name: 'toggle',
	triggers: ['t'],
	userPerms: ['administrator']
}, ({ Bot }: Lava.CommandParameters) => {
	const status = Bot.lottery.isActive;
	Bot.lottery.setActive = !status;
	return `**Status:** \`${Bot.lottery.isActive ? 'ON' : 'OFF'}\``
});