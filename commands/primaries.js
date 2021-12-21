const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('test')
		.setDescription('Gets primaries scores!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};
