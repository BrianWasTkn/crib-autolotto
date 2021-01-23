import Eris from 'eris'

export default class Listener {
    public client: Eris.Lava.Client;
    public constructor(client: Eris.Lava.Client) {
        this.client = client;
    }

    public exec(): void {
        this.client.logger.info(this.constructor.name, `${this.client.user.username}#${this.client.user.discriminator} is now online.`)
    }
}