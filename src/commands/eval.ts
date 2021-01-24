import Command from '../structures/Command'
import * as colors from '../structures/colors'
import Eris from 'eris'
import { inspect } from 'util'

export default new Command(
async ({ Bot, msg, args }: Eris.Lava.CommandFuncParams): Promise<Eris.EmbedOptions> => {
	
	const code = args.join(' ');
	const isPromise = code.includes('await') || code.includes('return');
	let before, evaled, type, evalTime, error;

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
}, {
	name: 'eval',
	triggers: ['ev'],
	userPerms: ['administrator']
});