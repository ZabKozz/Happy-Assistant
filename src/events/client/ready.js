const chalk = require('chalk');
const vers = require('../../config/version.json');
var figlet = require('figlet');
const lolcatjs = require('lolcatjs');

module.exports = {
    name: "ready",
    once: true,
    author: 'ZabKoz',
    version: '1.0.1',

    execute(client) {
        // Cleaning the console
        console.clear();
        // Creating a banner with the bot's name
        var banner = figlet.textSync(`Discord BOT Vollie V${vers.ver}`, {
            font: 'Small',
            horizontalLayout: 'default',
            width: 1000,
            whitespaceBreak: true
        });
        // Displaying a banner with a name
        lolcatjs.fromString(banner);
        // Display of the rest of the information
        console.log(chalk.bold.green('Launched Succesfully...'));
        // Information about the bot version
        console.log(chalk.magenta('Version:'),chalk.cyan(`${vers.ver}`));
        // Information about who created the bot
        console.log(chalk.magenta('Made by:'),chalk.cyan('ZabKoz'));
        // Information about the bot prefix
        console.log(chalk.magenta('Prefix:'),chalk.cyan(`${process.env.client_Prefix}\n`));
        // Information about the logged-in bot and the name
        console.log(chalk.green(chalk.bold(`${client.user.username}`),`is online!`));
        // Comming soon
        console.log(chalk.green(chalk.bold(`Dashboard:`),`http://localhost:`+process.env.web_Port));
    }
}