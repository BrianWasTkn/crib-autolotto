import Eris from 'eris'
import config from '../config'

class Lottery implements Eris.Lava.Lottery {
	public client: Eris.Lava.Client;
	public config: Eris.Lava.LotteryConfig;
	public guild: Eris.Guild;
	public channel: Eris.AnyGuildChannel;
	public requirement: Eris.Role;
	public winners: Eris.Collection<Eris.User>;
	public rewards: Eris.Lava.LotteryRewards;
	public constructor(client: Eris.Lava.Client) {
    	this.client = client;
    	this.config = config.lottery;
    	// client.on('ready', this.patch);
	}

	public async patch(): Promise<void> {
		this.guild = this.client.guilds.get(this.config.guild);
		this.channel = this.guild.channels.get(this.config.channel);
		this.requirement = this.guild.roles.get(this.config.role);
		this.winners = new Eris.Collection<Eris.User>(Eris.User);
		this.rewards = this.config.rewards;

		await this.runInterval();
	}

	public async runInterval(): Promise<void> {
		const member = this.guild.members.random();
		if (member.bot) {
			return await this.runInterval();
		} else {
			await this.roll(member);
			await this.client.util.sleep(this.config.interval);
			return await this.runInterval();
		}
	}

	public calcCoins(): { [k: string]: number } {
		const { util } = this.client;
		const { rewards: { min, max, cap } } = this;
		let won: number = util.randomNumber(min / 1000, max / 1000);
		let odds: number = Math.random();
		let raw: number = won;
		let multi: number;

		if (odds > 0.9) {
			multi = util.randomNumber(96, 100);
		} else if (odds > 0.8) {
			multi = util.randomNumber(80, 95);
		} else if (odds > 0.4) {
			multi = util.randomNumber(40, 79);
		} else if (odds > 0.2) {
			multi = util.randomNumber(16, 39);
		} else if (odds > 0.1) {
			multi = util.randomNumber(6, 15);
		} else {
			multi = util.randomNumber(1, 5);
		}

		won += Math.floor(won * (multi / 100));
		won = won > cap ? ((cap * 1000 + 1) / 1000) : won;
		won *= 1000; raw *= 1000;

		return { won, raw, multi };
	}

	public async roll(winner: Eris.Member): Promise<Eris.Message> {
		const emoji: Eris.Emoji = this.guild.emojis.find((emoji: Eris.Emoji) => emoji.id === '717347901587587153');
		const won: { [K: string]: number } = this.calcCoins();
		const message: string = [
			`<${emoji.animated ? 'a:' : ''}:${emoji.name}:${emoji.id}> **__Auto Lottery:tm:__**`,
			`${winner.mention} walked away with **${won.won.toLocaleString()} (${won.raw.toLocaleString()} original)** coins.`,
			`\n**Multiplier:** ${won.multi}%`
		].join('\n');

		return await this.client.createMessage(this.channel.id, message);
	}
}

export default Lottery;