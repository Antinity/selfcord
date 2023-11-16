const config = require("../../config.json");

module.exports = {
    name: 'messageCreate',
    async execute(message, client) {
        if (!message) return;
        if (message.author.id !== client.user.id) return;
        if (!message.content.toLowerCase().startsWith(config.prefix)) return;

        const command = client.commands.get(message.content.toLowerCase().split(" ")[0].slice(config.prefix.length));

        if (!command) return

        try {
            await command.execute(message, client, config);
        } catch (error) {
            console.error(error);
        }
    },
};