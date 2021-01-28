import Eris from 'eris'
import fs from 'fs'
import path from 'path'

import Lottery from './Lottery'
import Command from './Command'
import Collector from './Collector'
import logger from './logger'
import util from './util'
import config from '../config'

class Client extends Eris.Client implements Eris.Lava.Client {
	public commands: Eris.Collection<Eris.Lava.Command>;
	public aliases: Eris.Collection<Eris.Lava.Command>;
	public lottery: Eris.Lava.Lottery;
	public logger: Eris.Lava.Logger;
	public config: Eris.Lava.Config;
	public util: Eris.Lava.Util;
	public collector: Eris.Lava.Collector;
	public constructor({ token, options }: Eris.Lava.ClientConstructor) {
		super(token, options);
		this.commands = new Eris.Collection<Eris.Lava.Command>(Command);
		this.aliases = new Eris.Collection<Eris.Lava.Command>(Command);
		this.collector = new Collector(this);
		this.lottery = new Lottery(this);
		this.logger = logger;
		this.config = config;
		this.util = util;
	}

	public buildCommands(): void {
		const commands = fs.readdirSync(path.join(__dirname, '..', 'commands')); 
		commands.forEach((c: string) => {
			const command = require(path.join(__dirname, '..', 'commands', c)).default;
			this.commands.set(command.props.name, command);
			command.props.triggers.forEach((a: string) => this.aliases.set(a, command));
			this.logger.info('Core', `Lotto Command "${command.props.name}" loaded.`);
		});
	}

	public buildListeners(): void {
		const discord = fs.readdirSync(path.join(__dirname, '..', 'handlers', 'discord')); 
		const lotto = fs.readdirSync(path.join(__dirname, '..', 'handlers', 'lottery'));
		const listeners = [
			{ files: discord, key: 'Discord', emitter: this },
			{ files: lotto, key: 'Lottery', emitter: this.lottery },
		];

		for (const group of listeners) {
			group.files.forEach((l: string) => {
				group.emitter.on(l.split('.')[0], async (...args: any) => {
					const listener = new (require(path.join(__dirname, '..', 'handlers', group.key.toLowerCase(), l)).default)(this);
					await listener.exec(...args);
				});

				this.logger.info('Core', `${group.key} Listener "${l.split('.')[0]}" loaded.`);
			});
		}
	}
	
	public async connect(): Promise<void> {
		this.buildCommands();
		this.buildListeners();
		return super.connect();
	}
}

export default Client;