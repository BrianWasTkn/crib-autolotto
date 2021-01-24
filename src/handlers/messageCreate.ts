import Eris from 'eris'

export default class MessageCreate {
	public client: Eris.Lava.Client;
	public constructor(client: Eris.Lava.Client) {
		this.client = client;
	}

	public async exec(msg: Eris.Message<Eris.GuildTextableChannel>): Promise<any> {
		if (msg.channel.type !== 0) return;
		if (msg.author.bot) return;

		const args: string[] = msg.content.replace(/<@!/gi, '<@').substring(this.client.config.prefix[0].length).trim().split(/ +/g);
		const cmd: string = args.shift().toLowerCase();
		const command: Eris.Lava.Command = this.client.commands.get(cmd) || this.client.aliases.get(cmd);
		if (!command) return;

		try {
			await command.run({ 
				Bot: this.client, 
				msg, args
			});
		} catch(error) {
			const err: Error = error;
			this.client.logger.error(
				this.constructor.name, `Command Execution for ${command.props.name} failed.`, 
				error, true
			);
		}
	}
}