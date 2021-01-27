import Command from '../structures/Command'
import * as colors from '../structures/colors'
import { Lava, Message, GuildTextableChannel, EmbedOptions } from 'eris'
import { inspect } from 'util'

export default new Command({
	name: 'eval',
	triggers: ['ev', 'e'],
	userPerms: ['administrator']
}, async ({ Bot, msg, args }: Lava.CommandParameters): Promise<EmbedOptions> => {
	const code = args.join(' ');
	const isPromise = code.includes('await') || code.includes('return');
	let before: number;
	let evalTime: number;
	let evaled: Promise<any> | any;
	let type: typeof evaled;
	let error: boolean;

	before = Date.now();
	try {
		evaled = await eval(isPromise ? `(async()=>{${code}})()` : code);
		error = false;
	} catch(error) {
		evaled = error.message;
		error = true;
	}
	evalTime = Date.now() - before;
	type = typeof evaled;

	if (type !== 'string') {
		evaled = inspect(evaled, { depth: 0 });
	}

	let token = new RegExp(Bot.token, 'gi');
	evaled = evaled.replace(token, 'N0.T0K4N.F04.Y0U');
	return {
		color: error ? colors.red : colors.green,
		description: '```js\n' + evaled + '\n```',
		fields: [{
			name: 'Type',
			value: '```\n' + type + '\n```'
		}, {
			name: 'Execution',
			value: '```\n' + evalTime + 'ms\n```'
		}],
	}
});