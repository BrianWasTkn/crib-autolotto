import Eris from 'eris'

export default class {
	public client: Eris.Lava.Client;
	public constructor(client: Eris.Lava.Client) {
		this.client = client;
	}

	public async exec(
		lottery: Eris.Lava.Lottery,
		winner: Eris.Member,
		won: any
	): Promise<Eris.Message> {
		// const emoji: Eris.Emoji = lottery.guild.emojis.find((emoji: Eris.Emoji) => emoji.id === '717347901587587153');
		if (!lottery.isActive) return null;
		const emoji: Eris.Emoji = lottery.client.guilds.get('658738120543436811').emojis.find(e => e.id === '753138901169995797');
		const message: string = [
			`<${emoji.animated ? 'a:' : ''}:${emoji.name}:${emoji.id}> **__Auto Lottery:tm:__**`,
			`**${winner.user.username}#${winner.user.discriminator}** walked away with **${won.won.toLocaleString()} (${won.raw.toLocaleString()} original)** coins.`,
			`\n**Multiplier:** ${won.multi}%`
		].join('\n');

		return await this.client.createMessage(lottery.channel.id, message);
	}
}