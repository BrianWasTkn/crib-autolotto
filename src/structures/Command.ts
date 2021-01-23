import { AnyAaaaRecord } from 'dns';
import Eris from 'eris'

export default class Command implements Eris.Lava.Command {
	public id: string | number;
	public props: Eris.Lava.CommandProps;
	public fn: any;
	public constructor(fn: any, props: Eris.Lava.CommandProps) {
		this.id = 'command';
		this.props = props;
		this.fn = fn;
	}

	public async run({ Bot, msg, args }: {
		Bot: Eris.Lava.Client,
		msg: Eris.Message<Eris.GuildTextableChannel>,
		args: string[]
	}): Promise<Eris.Message> {
		// Guild-wide Permissions 
		let missingPerms: Eris.Lava.PermissionKeys[] = [];
		const embed = this.checkPermissions(msg, []);
		return await Bot.createMessage(msg.channel.id, { embed });
	}

	public checkPermissions(msg: Eris.Message, result: Eris.Lava.PermissionKeys[]): any {
		for (let perm of this.props.userPerms || []) {
			if (!msg.member.permissions.has(perm)) {
				result.push(perm);
			}
		}

		return {
			color: 'red',
			title: 'Well rip, no perms',
			description: [
				`You don't have permissions to run the \`${this.props.name}\` command.`,
				'Make sure you have the following permission to use this:'
			].join('\n'),
			fields: [{
				name: 'Required Permission(s)',
				value: `\`${result.join('`, `')}\``
			}]
		}
	}
}