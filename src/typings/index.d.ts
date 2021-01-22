import { Client as ErisClient, ClientOptions, Collection, ExtendedUser, User } from 'eris';

declare module 'eris' {
    export interface ClientUser extends ExtendedUser {
        public tag: string;        
    }

	export namespace Lava {
		// Structures
		export class Client extends ErisClient {
            public constructor(token: string, options?: ClientOptions);
            public user: ClientUser;
			public commands: Collection<LavaCommand>;
            public winners: Collection<Winners>;
            public lottery: Lottery;
            public logger: Logger;
		}
		export class Command {
			public constructor();
			public id: string | number;
			public fn: (...params: (any | any[])[]) => any;
			public props: any;
        }
        export class Lottery {
            public constructor(client: LavaClient);
        }
		export class Winners {
			public id: string;
			public users: User[];
        }
        
        // Interfaces
        export interface Logger {
            info: (klass: string, message: any) => void;
        }
	}
}