const { RichPresence, DiscordRPCServer } = require('discord.js-selfbot-v13');
const config = require('../../config.json');

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`[✓] Successfully logged in as ${client.user.username}`);

        const jsonData = config.rpc;
        let currentKeyIndex = 0;

        function updateRichPresence() {
            const key = Object.keys(jsonData)[currentKeyIndex];

            if (!key) return;

            const data = jsonData[key];
            console.log(data);

            if (!data.time || data.time === "") data.time = Date.now();

            const rp = new RichPresence()
                .setApplicationId(data.id)
                .setType(data.type)
                .setURL(data.url)
                .setState(data.state)
                .setName(data.name)
                .setDetails(data.details)
                .setStartTimestamp(data.time)
                .setAssetsLargeImage(data.large)
                .setAssetsLargeText(data.largeText)
                .setAssetsSmallImage(data.small)
                .setAssetsSmallText(data.smallText)
            if (data.buttonText1 && data.buttonLink1) {
                rp.addButton(data.buttonText1, data.buttonLink1)
            }
            if (data.buttonText2 && data.buttonLink2) {
                rp.addButton(data.buttonText2, data.buttonLink2)
            }

            client.user.setActivity(rp);
            currentKeyIndex = (currentKeyIndex + 1) % Object.keys(jsonData).length;
        }

        setInterval(() => {
            updateRichPresence();
        }, config.rpcUpdate * 1000);

    },
};