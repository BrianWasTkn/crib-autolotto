import Eris from 'eris'

export default class {
	public client: Eris.Lava.Client;
	public constructor(client: Eris.Lava.Client) {
		this.client = client;
	}

	public async exec({ guild, channel, requirement }: Eris.Lava.Lottery): Promise<any> {
		this.client.logger.info('Core', `Guild: ${guild.name}`);
		this.client.logger.info('Core', `Channel: ${channel.name}`);
		this.client.logger.info('Core', `Requirement: ${requirement.name}`);
		return this.client.logger.info('Core', 'The lottery has been patched.');
	}
}