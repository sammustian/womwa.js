const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token } = require('./config.json');
const {getCurrentPrimaryScores} = require('./API/fleaflicker.js')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

//console.log(client.commands);

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    console.log(interaction);
    if (!interaction.isCommand()) return;

	if (interaction.commandName === 'ping') {
		await interaction.reply('Pong!');
	}
    if (interaction.commandName === 'primaries') {
        let currentPrimaryScores = getCurrentPrimaryScores();
		await interaction.reply(currentPrimaryScores);
	}
});

client.login(token);
