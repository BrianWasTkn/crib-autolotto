import Eris, { Client as ErisClient, ClientOptions, Collection, Message, User } from 'eris';
import { EventEmitter } from 'events'

declare module 'eris' {
	export namespace Lava {
		// Structures
		export class Client extends ErisClient {
            public constructor(token: string, options?: ClientOptions);
			public commands: Collection<Command>;
            public aliases: Collection<Command>;
            public lottery: Lottery;
            public logger: Logger;
            public config: Config;
            public util: Util;
            public collector: Collector;
		}
		export class Command {
			public constructor(props: CommandProps, fn: any);
			public id: string | number;
			public fn: (params: any) => any;
			public props: any;
            public run(params: any): Promise<any>;
            public checkPermissions(msg: Message, result: null[]): any;
        }
        export class Lottery extends EventEmitter {
            public constructor(client: Client);
            public client: Client;
            public config: LotteryConfig;
            public guild: Eris.Guild;
            public channel: Eris.AnyGuildChannel;
            public requirement: Eris.Role;
            public winners: Eris.Collection<Eris.User>;
            public rewards: LotteryRewards;
            public patch(): Promise<void>;
            public run(): Promise<void>;
            public calcCoins(): { [K: string]: number };
            public roll(): Eris.Member;
            public on(event: string = 'roll', listener: (
                message: string,
                winner: Eris.Member,
                won: any
            ) => any);
            public on(event: string = 'patch', listener: (
                lotto: Lottery
            ) => any);
        }
        export class Collector {
            public constructor(client: Client);
            public collectors: any;
            public verify(msg: Message): void;
            public awaitMessage(
                channelID: Snowflake, 
                userID: Snowflake, 
                timeout: number, 
                filter?: Function
            ): Promise<Message>;
        }
        
        // Interfaces
        export interface ClientConstructor {
            token: string;
            options: Eris.ClientOptions;
        }
        export interface Logger {
            info: (klass: string, message: any) => void;
            error: (klass: string, message: any, error?: Error, stack?: boolean) => void;
        }
        export interface Util {
            randomNumber: (min?: number, max?: number) => number;
            randomInArray: (array: any) => any;
            sleep: (ms?: number) => Promise<number>;
        }
        export interface CommandProps {
            name: string;
            triggers?: string[];
            userPerms?: PermissionKeys[];
            botPerms?: PermissionKeys[];
        }
        export interface Config {
            token: string;
            prefix: string[];
            owners: Snowflake[];
            lottery: LotteryConfig;
            clientOptions: Eris.ClientOptions;
        }
        export interface LotteryConfig {
            guild: Snowflake;
            channel: Snowflake;
            role: Snowflake;
            interval: number;
            rewards: LotteryRewards
        }
        export interface LotteryRewards {
            [k: string]: number;
        };
        export interface CommandParameters {
            Bot: Client;
            msg: Message<GuildTextableChannel>;
            args?: string[]
        }

        // Types
        export type PermissionKeys = keyof Eris.Constants["Permissions"];
        export type PermissionValues = Eris.Constants["Permissions"][keyof Eris.Constants["Permissions"]];
        export type Snowflake = string;
	}
}