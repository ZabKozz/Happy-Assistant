const chalk = require('chalk');
// Function responsible for loading events
async function loadEvents(client) {
    // Addition of a function responsible for searching for files
    const loadFiles = require('./functions/loadFiles');
    const capitalizeFirstLetter = require('./functions/capitalizeFirstLetter');
    // Removal of the customer event collection
    await client.events.clear();
    // Event files saving variable
    const Files = await loadFiles('/src/events');
    // Loop responsible for adding events
    Files.forEach((file) => {
        // Event file saving variable
        const event = require(file);
        // 
        const execute = (...args) => event.execute(...args, client)
        // Saving of the customer event collection
        client.events.set(event.name, execute);
        // Checking whether an event works on or once
        if(event.rest) {
            if(event.once) client.rest.once(event.name, execute);
            else client.rest.on(event.name, execute);
        } else {
            if(event.once) client.once(event.name, execute);
            else
            client.on(event.name, execute);
        }
        // Display that an event has been saved and is running
        return console.log(chalk.green(`[+]`), (chalk.gray(capitalizeFirstLetter(event.name))));
    });
};
// Function responsible for loading commands
async function loadCommand(client) {
    // Addition of a function responsible for searching for files
    const loadFiles = require('./functions/loadFiles');
    const capitalizeFirstLetter = require('./functions/capitalizeFirstLetter');
    // Removal of the customer commands collection
    await client.commands.clear();
    // Removal of the customer aliases collection
    await client.aliases.clear();
    // Commands files saving variable
    const Files = await loadFiles('/src/commands');
    // Loop responsible for adding commands
    Files.forEach((file) => {
        // Command file saving variable
        const command = require(file);
        // Loop responsible for adding command to the collection
        client.commands.set(command.help.name, command);
        // Loop responsible for adding aliases to the collection
        command.help.aliases.forEach(alias => {
            client.aliases.set(alias, command.help.name);
        });
        // Display that the command has been added and is runnable
        return console.log(chalk.green(`[+]`), (chalk.gray(capitalizeFirstLetter(command.help.name))));
    });
}

module.exports = {loadEvents, loadCommand};
