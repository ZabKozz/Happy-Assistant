module.exports = {
    name: 'messageCreate',
    author: 'ZabKoz',
    version: '1.0.0',

    async execute(message, client) {
        // Ignore all bots
        if (message.author.bot) return;
        // Ignore messages not starting with the prefix (in config.json)
        if (message.content.indexOf(process.env.client_Prefix) !== 0) return;
        // Our standard argument/command name definition.
        const args = message.content.slice(process.env.client_Prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();
        // Grab the command data from the client.commands Enmap
        const cmd = client.commands.get(command);
        // If that command doesn't exist, silently exit and do nothing
        if (!cmd) return;
        if (message.content == process.env.client_Prefix+'index') return;
        // Run the command
        cmd.run(client, message, args);
    }
}
