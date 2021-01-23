require('dotenv').config();
import Client from './structures/Client' 
import config from './config'

const bot: Client = new Client({ 
	token: config.token,
	options: config.clientOptions
});

bot.connect();