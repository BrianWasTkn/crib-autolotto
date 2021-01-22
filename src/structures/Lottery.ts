import Eris from 'eris'

class Lottery {
    public client: Eris.Lava.Client;
    public constructor(client: Eris.Lava.Client) {
        this.client = client;
    }
}

export default Lottery;