import { EventEmitter } from 'events'
import Eris from 'eris'
import config from '../config'

class Lottery extends EventEmitter implements Eris.Lava.Lottery {
	public client: Eris.Lava.Client;
	public config: Eris.Lava.LotteryConfig;
	public guild: Eris.Guild;
	public channel: Eris.AnyGuildChannel;
	public requirement: Eris.Role;
	public winners: Eris.Collection<Eris.User>;
	public rewards: Eris.Lava.LotteryRewards;
	public active: boolean;
	public constructor(client: Eris.Lava.Client) {
		super();
		this.client = client;
		this.active = this.isActive;
		this.config = config.lottery;
	}

	public set setActive(v: boolean) {
		this.active = v;
	}

	public get isActive(): boolean {
		return this.active;
	}

	public async patch(): Promise<void> {
		this.guild = this.client.guilds.get(this.config.guild);
		this.channel = this.guild.channels.get(this.config.channel);
		this.requirement = this.guild.roles.get(this.config.role);
		this.winners = new Eris.Collection<Eris.User>(Eris.User);
		this.rewards = this.config.rewards;
		this.setActive = true;

		this.emit('patch', this);
		await this.run();
	}

	public async run(): Promise<void> {
		const member = this.roll();
		const won = this.calcCoins();
		this.emit('roll', this, member, won);
		await this.client.util.sleep(this.config.interval);
		return this.run();
	}

	public calcCoins(): { [k: string]: number } {
		const { rewards: { min, max, cap } } = this;
		const { util } = this.client;
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

		won += Math.round(won * (multi / 100));
		won = ((won * 1000) > cap) ? ((cap + 1) / 1000) : won;
		won *= 1000; raw *= 1000;

		return { won, raw, multi };
	}

	public roll(): Eris.Member {
		const members: Eris.Member[] = this.guild.members
		.filter((m: Eris.Member) => !m.bot)
		.filter((m: Eris.Member) => m.roles.includes(this.requirement.id));

		return this.client.util.randomInArray(members);
	}
}

export default Lottery;