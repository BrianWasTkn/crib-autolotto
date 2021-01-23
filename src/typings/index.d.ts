import Eris, { Client as ErisClient, ClientOptions, Collection, Message, User } from 'eris';

declare module 'eris' {
	export namespace Lava {
		// Structures
		export class Client extends ErisClient {
            public constructor(token: string, options?: ClientOptions);
			public commands: Collection<LavaCommand>;
            public lottery: Lottery;
            public logger: Logger;
            public config: Config;
            public util: Util;
		}
		export class Command {
			public constructor(fn: any, props: CommandProps);
			public id: string | number;
			public fn: (params: any) => any;
			public props: any;
            public run(params: any): Promise<any>;
            public checkPermissions(msg: Message, result: null[]): any;
        }
        export class Lottery {
            public constructor(client: Client);
            public client: Client;
            public config: LotteryConfig;
            public guild: Eris.Guild;
            public channel: Eris.AnyGuildChannel;
            public requirement: Eris.Role;
            public winners: Eris.Collection<Eris.User>;
            public rewards: LotteryRewards;
            public patch(): Promise<void>;
            public calcCoins(): { [K: string]: number };
            public roll(member: Eris.Member): Promise<Eris.Message>;
        }
        
        // Interfaces
        export interface ClientConstructor {
            token: string;
            options: Eris.ClientOptions;
        }
        export interface Logger {
            info: (klass: string, message: any) => void;
        }
        export interface Util {
            randomNumber: (min: number, max: number) => number;
            sleep: (ms: number) => Promise<number>;
        }
        export interface CommandProps {
            name: string;
            triggers: string[];
            userPerms: PermissionKeys[];
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
        export interface CommandFuncParams {
            Bot?: Client;
            msg:? Message;
            args?: string[]
        }

        // Types
        export type PermissionKeys = keyof Eris.Constants["Permissions"];
        export type PermissionValues = Eris.Constants["Permissions"][keyof Eris.Constants["Permissions"]];
        export type Snowflake = string;
	}
}