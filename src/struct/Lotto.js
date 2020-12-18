import { Collection } from 'discord.js'

const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export class Lottery {
	constructor(client, options) {

		this.client = client;
		this.active = new Collection([['active', 1]]);
		this.multi = randomNumber(1, 100);
		this.winners = new Collection();
		this.interval = (options.interval || 6) * 60 * 60;
		this.lastRoll = null;
		this.prize = Object.assign(options.prize, {
			min: 100, max: 500, limit: 600
		});

		client.on('ready', () => this.patch(options));
	}

	patch(options) {
		/* {Guild} guild - the memers crib discord server */
		this.guild = this.client.guilds.cache.get(options.host.guild);
		/* {GuildChannel} channel - the lotto channel */
		this.channel = this.guild.channels.cache.get(options.host.channel);
		/* {Role} channel - the lotto channel */
		this.requirement = this.guild.roles.cache.get(options.host.role);
		/* {} */
		this.run();
	}

	async run() {
		this.client._log(this.constructor.name, 'main', 'Lottery Loaded');
		let { 
			guild, channel, requirement, active,
			interval, multi, prize: { min, max, limit },
			winners
		} = this;

		/* The interval */
		const runInterval = () => {
			setTimeout(async () => {
				if (active.get('active') === 1) {
					await roll();
					await runInterval();
				} else {
					await	runInterval();
				}
			}, interval * 1000);
		}

		/* A func to roll winners */
		const roll = async () => {
			const members = guild.roles.cache.get(requirement.id).members;
			const winner = members.filter(m => !m.bot).random();

			let won = randomNumber(min, max);
			let raw = won;
			let odds = Math.random();

			if (odds > 0.9) {
				multi = randomNumber(96, 100);
			} else if (odds > 0.7) {
				multi = randomNumber(70, 95);
			} else if (odds > 0.4) {
				multi = randomNumber(41, 70);
			} else if (odds > 0.2) {
				multi = randomNumber(26, 40);
			} else if (odds > 0.1) {
				multi = randomNumber(10, 25);
			} else {
				multi = randomNumber(1, 10);
			}

			won += Math.floor(won * (multi / 100));
			if (won > limit) won = (limit * 1000 + 1) / 1000;
			won *= 1000; raw *= 1000;

			if (!winners.has(winner.id)) {
				winners.set(winner.id, [{
					coins: won, raw,
					timestamp: Date.now()
				}]); 
			} else {
				let collectionWonOfWinners = winners.get(winner.id);
				winners.set(winner.id, [...collectionWonOfWinners, {
					coins: won, raw,
					timestamp: Date.now()
				}]);
			}

			let winnerObj = winners.get(winner.id);
			let emoji = guild.emojis.cache.get('717347901587587153');
			await channel.send([
				`<${emoji.animated ? 'a:' : ''}:${emoji.name}:${emoji.id}> **__Auto Lottery:tm:__**`,
				`\n<@${winner.nickname ? '!' : ''}${winner.user.id}> walked away with **${won.toLocaleString()} (${raw.toLocaleString()} original)** coins.`,
				`\n\n**Multiplier:** ${multi}% | **Times Won:** ${winnerObj.length}`,
				`\n**Biggest Winning so far:** ${winnerObj.sort((p, c) => p.coins - c.coins).reverse()[0].coins.toLocaleString()}`
			].join(' '));
		}

		/* Run */
		await roll();
		await runInterval();
	}
}