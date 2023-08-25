// Function responsible for loading commands (/) for the test server
async function createCmd(Client, guildId) {
    await Client.guilds.cache.get(guildId)?.commands.set(client.commands);
}
// Function responsible for loading commands (/) for all servers
async function globalCmd(client) {
    await client.application?.commands.set(client.commands);
}
// Exporting all functions
module.exports = { createCmd, globalCmd };