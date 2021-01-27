import Eris from 'eris'

export default class Collector implements Eris.Lava.Collector {
	public collectors: any;
	public constructor(client: Eris.Lava.Client) {
		this.collectors = {};
		client.on('messageCreate', this.verify.bind(this));
	}

	public async verify(msg: Eris.Message) {
		const collector = this.collectors[msg.channel.id + msg.author.id];
		if (collector && collector.filter(msg)) {
			collector.resolve(msg);
	    }
	}

	public async awaitMessage(
		channelID: Eris.Lava.Snowflake, 
		userID: Eris.Lava.Snowflake, 
		timeout: number, 
		filter: Function = () => true
	): Promise<Eris.Message> {
	    return new Promise((resolve: Function) => {
			if (this.collectors[channelID + userID]) {
				delete this.collectors[channelID + userID];
			}

			this.collectors[channelID + userID] = { resolve, filter };

			setTimeout(resolve.bind(null, false), timeout);
	    });
	}
}