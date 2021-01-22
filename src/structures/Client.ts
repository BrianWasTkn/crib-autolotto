import Eris from 'eris'
import fs from 'fs'
import path from 'path'

import Lottery from './Lottery'
import logger from './logger'

class Client extends Eris.Client implements Eris.Lava.Client {
	public user: Eris.ClientUser;
	public commands: Eris.Collection<Eris.Lava.Command>;
	public aliases: Eris.Collection<Eris.Lava.Command>;
	public winners: Eris.Collection<Eris.Lava.Winners>;
	public lottery: Eris.Lava.Lottery;
	public logger: Eris.Lava.Logger;
	public constructor(token: string, options?: Eris.ClientOptions) {
		super(token, options);
		this.commands = new Eris.Collection<Eris.Lava.Command>(Eris.Lava.Command);
		this.aliases = new Eris.Collection<Eris.Lava.Command>(Eris.Lava.Command);
		this.winners = new Eris.Collection<Eris.Lava.Winners>(Eris.Lava.Winners);
		this.lottery = new Lottery(this);
		this.logger = logger;
	}

	public buildCommands(): void {
		const commands = fs.readdirSync(path.join(__dirname, '..', 'commands')); 
		commands.forEach((c: string) => {
			const command = require(path.join(__dirname, '..', 'commands', c));
			this.commands.set(command.props.name, command);
			command.props.triggers.forEach((a: string) => this.aliases.set(a, command));
		})
	}

	public buildListeners(): void {
		const listeners = fs.readdirSync(path.join(__dirname, '..', 'handlers')); 
		listeners.forEach((l: string) => {
			const listener = new (require(path.join(__dirname, '..', 'handlers', l)))(this);
			this.on(l.split('.')[0], listener.exec);
		})
	}
	
	public async connect(): Promise<void> {
		this.buildCommands();
		this.buildListeners();
		return await super.connect();
	}
}

export default Client;