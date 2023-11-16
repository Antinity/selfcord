module.exports = {
    name: 'ping',
    description: 'Ping!',
    async execute(message, client, config) {
        message.edit(`Pong! ${client.ws.ping}ms`);
    },
};