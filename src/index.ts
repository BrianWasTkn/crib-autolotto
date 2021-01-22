import 'dotenv/config'
import Client from './structures/Client'
const bot = new Client(process.env.TOKEN);
bot.connect();