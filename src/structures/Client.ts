import Eris from 'eris'
import fs from 'fs'
import path from 'path'

import Lottery from './Lottery'
import Command from './Command'
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
	public constructor({ token, options }: Eris.Lava.ClientConstructor) {
		super(token, options);
		this.commands = new Eris.Collection<Eris.Lava.Command>(Command);
		this.aliases = new Eris.Collection<Eris.Lava.Command>(Command);
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
		})
	}

	public buildListeners(): void {
		const listeners = fs.readdirSync(path.join(__dirname, '..', 'handlers')); 
		listeners.forEach((l: string) => {
			const listener = new (require(path.join(__dirname, '..', 'handlers', l)).default)(this);
			this.on(l.split('.')[0], listener.exec);
		})
	}
	
	public async connect(): Promise<void> {
		this.buildCommands();
		this.buildListeners();
		return super.connect();
	}
}

export default Client;