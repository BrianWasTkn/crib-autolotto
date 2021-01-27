import Eris from 'eris'

export default class {
	public client: Eris.Lava.Client;
	public constructor(client: Eris.Lava.Client) {
		this.client = client;
	}

	public async exec(lottery: Eris.Lava.Lottery): Promise<any> {
		this.client.logger.info('Core', `Guild: ${lottery.guild.name}`);
		this.client.logger.info('Core', `Channel: ${lottery.channel.name}`);
		this.client.logger.info('Core', `Requirement: ${lottery.roll.name}`);
		return this.client.logger.info('Core', 'The lottery has been patched.');
	}
}