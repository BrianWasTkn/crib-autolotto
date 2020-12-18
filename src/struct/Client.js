import { Client, Collection } from 'discord.js'
import { Lottery } from './Lotto.js'
import { readdirSync } from 'fs'
import { join } from 'path'
import chalk from 'chalk'
import moment from 'moment'

export class Discord extends Client {
	constructor(config) {
		super({ 
			disableMentions: 'everyone'
		});
		
		this.config = config;
		this.commands = new Collection();
		this.aliases = new Collection();
		this.lottery = new Lottery(this, config);

		this.load();
	}

	_log(c, t, m, e = false) {
		const log = (c, m, e) => {
			const ts = moment().format('HH:mm:ss');
			return console.log(
				`[${chalk.whiteBright(ts)}]`,
				c, chalk.whiteBright('=>'),
				m, e || ''
			);
		}

		switch(t) {
			case 'main': 
				log(chalk.cyanBright(c), chalk.yellowBright(m));
				break;
			case 'error':
				log(chalk.redBright(c), chalk.redBright(m), e);
				break;
		}
	}

	load() {
		readdirSync(`${process.cwd()}/src/cmds`).forEach(async cmd => {
			const command = (await import(`../cmds/${cmd}`)).default;
			this.commands.set(command.props.name, command);
			command.props.aliases.forEach(a => this.aliases.set(a, command));
			this._log('Command', 'main', `Command "${command.props.name}" loaded.`);
		});

		this.on('ready', this.onReady);
		this.on('message', this.onMessage);
	}

	onReady() {
		this._log(this.constructor.name, 'main', `${this.user.tag} is online.`);
	}

	async onMessage(msg) {
		const { author, channel } = msg;
		if (author.bot || channel.type === 'dm') return;

		if (!msg.content.startsWith(this.config.prefix)) return;

		const args = msg.content.slice(this.config.prefix.length + 1).trim().split(/ +/g);
		let command = args.shift();
		command = this.commands.get(command) || this.aliases.get(command);

		if (!command) return;

		try {
			await command.run({ bot: this, msg, args });
		} catch(error) {
			this._log(this.constructor.name, 'error', `Cannot run "${command.props.name}"`, error.stack);
		}
	}
}