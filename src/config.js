
const randomNumber = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

const config = {
	/* {String} token - the discord token */
	token: 'Njg2OTk1NDA5NDU3MjUwMzI2.XmfUVQ.GQI2OwoJs60KdGyupJ6UkC7j2rc',
	/* {String} prefix - the prefix of this bot */
	prefix: 'lotto',
	/* {Number} interval - interval in hours */
	interval: 9,
	/* {Object} prize */
	prize: {
		/* {Number} min - minimum prize in hundreds */
		min: 100,
		/* {Number} max - maximum prize in hundreds */
		max: 500,
		/* {Number} limit - the limit in hundreds */
		limit: 600
	},
	/* {Object} host */
	host: {
		/* {Guild} guild - the memers crib discord server */
		guild: '691416705917779999',
		/* {Role} role - the required role for this guild */
		role: '692517500814098462',
		/* {GuildChannel} channel - the main channel for this guild */
		channel: '717351680676462712'
		// channel: '692527636676739072' - staff-commands
	}
};

export default config;