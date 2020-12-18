export class Command {
	constructor({ name, aliases, perms }, fn) {
		this.run = fn;
		this.props = {
			name, aliases, perms: ['SEND_MESSAGES'].concat(perms || [])
		};
	}

	async execute({ bot, msg, args }) {
		const { member, channel } = msg;

		if (!member.permissions.has(this.props.perms)) {
			return channel.send([
				'**Missing Permissions**',
				'You don\'t have enough permissions to run this command.',
				`Make sure you have the \`${this.props.perms}\` permission(s) first.`
			].join('\n'));
		}

		return await this.run({ bot, msg, args });
	}
}