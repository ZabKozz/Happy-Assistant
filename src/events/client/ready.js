const chalk = require('chalk');
const vers = require('../../config/version.json');
const { loadGuilds } = require('../../utils/functions/mongoose/loadGuilds');
const { globalCmd } = require('../../utils/slashHandler');
var figlet = require('figlet');
const lolcatjs = require('lolcatjs');

module.exports = {
    name: "ready",
    once: true,
    author: 'ZabKoz',
    version: '1.0.3',

    execute(client) {
        // Cleaning the console
        console.clear();
        // Creating a banner with the bot's name and version
        var banner = figlet.textSync(`Discord BOT Vollie V${vers.ver}`, {
            font: 'Small',
            horizontalLayout: 'default',
            width: 1000,
            whitespaceBreak: true
        });
        // Displaying a banner with a name
        lolcatjs.fromString(banner);
        // Display of the rest of the information
        console.log(`[${chalk.blue('Client')}]`, chalk.bold.green('Launched Succesfully...'));
        // Information about who created the bot
        console.log(`[${chalk.blue('Client')}]`, chalk.magenta('Made by:'), chalk.cyan('ZabKoz'));
        // Information about the bot prefix
        console.log(`[${chalk.blue('Client')}]`, chalk.magenta('Prefix:'), chalk.cyan(`${process.env.client_Prefix}\n`));
        // Information about the logged-in bot and the name
        console.log(`[${chalk.blue('Client')}]`, chalk.green(chalk.bold(`${client.user.username}`), `is online!`));
        // Information about which port the bot site is running on
        console.log(`[${chalk.blue('Website')}]`, chalk.green(chalk.bold(`http://localhost:` + process.env.web_Port)));
        // Activation of the function responsible for loading server configurations
        loadGuilds(client);
        // Activation of the function responsible for adding commands to the client
        globalCmd(client);
        // Database connection information
        client.mongoose.init()
    }
}