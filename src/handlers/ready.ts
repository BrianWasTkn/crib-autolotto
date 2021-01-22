import { Lava } from 'eris'

export default class Listener {
    public client: Lava.Client;
    public constructor(client: Lava.Client) {
        this.client = client;
    }

    public exec(): void {
        this.client.logger.info(this.constructor.name, `${this.client.user.tag} is now online.`)
    }
}