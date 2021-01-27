import Eris from 'eris'

export default class {
	public client: Eris.Lava.Client;
	public constructor(client: Eris.Lava.Client) {
		this.client = client;
	}

	public async exec(): Promise<void> {
		const message: string = `${this.client.user.username}#${this.client.user.discriminator} is now online.`
		this.client.logger.info('Core', message);
		await this.client.lottery.patch();
	}
}