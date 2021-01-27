import Eris from 'eris'
import * as colors from './colors'

export default class Command implements Eris.Lava.Command {
	public id: string | number;
	public props: Eris.Lava.CommandProps;
	public fn: any;
	public constructor(props: Eris.Lava.CommandProps, fn: any) {
		this.id = 'command';
		this.props = props;
		this.fn = fn;
	}

	public async run({ Bot, msg, args }: Eris.Lava.CommandParameters): Promise<Eris.Message> {
		// Guild-wide Permissions 
		let missingPerms: Eris.Lava.PermissionKeys[] = [];
		const result = this.checkPermissions(msg, missingPerms);
		if (result && result.length > 1) return Bot.createMessage(msg.channel.id, { embed: {
			color: colors.red,
			title: 'Well rip, no perms',
			description: [
				`You don't have permissions to run the \`${this.props.name}\` command.`,
				'Make sure you have the following permission to use this command:'
			].join('\n'),
			fields: [{
				name: `${result.length} Required Permission(s)`,
				value: `\`${result.join('`, `')}\``
			}]
		}});

		// Command Execution
		const commandReturn = await this.fn({ Bot, msg, args });
		return Bot.createMessage(
			msg.channel.id, 
			commandReturn instanceof Object 
				? { embed: commandReturn } 
			: commandReturn
		);
	}

	public checkPermissions(msg: Eris.Message, result: Eris.Lava.PermissionKeys[]): any {
		for (let perm of this.props.userPerms || []) {
			if (!msg.member.permissions.has(perm)) {
				result.push(perm);
			}
		}

		return result;
	}
}