const chalk = require('chalk');
// Function responsible for loading events
async function loadEvents(client) {
    // Addition of a function responsible for searching for files
    const loadFiles = require('../files/loadFiles');
    const capitalizeFirstLetter = require('../files/capitalizeFirstLetter');
    // Removal of the customer event collection
    await client.events.clear();
    // Event files saving variable
    const Files = await loadFiles('./src/bot/events');
    // Loop responsible for adding events
    Files.forEach((file) => {
        // Event file saving variable
        const event = require(file);
        // 
        const execute = (...args) => event.execute(...args, client)
        // Saving of the customer event collection
        client.events.set(event.name, execute);
        // Checking whether an event works on or once
        if (event.rest) {
            if (event.once) client.rest.once(event.name, execute);
            else client.rest.on(event.name, execute);
        } else {
            if (event.once) client.once(event.name, execute);
            else
                client.on(event.name, execute);
        }
        // Display that an event has been saved and is running
        return console.log(`[${chalk.green.bold('Event')}]`, (chalk.gray(capitalizeFirstLetter(event.name))));
    });
};
// Function responsible for loading commands
async function loadCommand(client) {
    // Addition of a function responsible for searching for files
    const loadFiles = require('../files/loadFiles');
    const capitalizeFirstLetter = require('../files/capitalizeFirstLetter');
    // Removal of the customer commands collection
    await client.commands.clear();
    //
    const Files = await loadFiles('./src/bot/commands');
    // Loop responsible for adding commands
    Files.forEach((file) => {

        // Command file saving variable
        const command = require(file);
        if (!command.name) {
            // Display of information that the command name is not specified 
            return console.log(`[${chalk.red.bold('Command')}]`,chalk.gray('No command name given please go to file:'), file);
        }
        // Saving command data in the "client.commands" collection
        client.commands.set(command.name, command);
        // Display that the command has been added and is runnable
        return console.log(`[${chalk.green.bold('Command')}]`, (chalk.gray(capitalizeFirstLetter(command.name))));
    });
}
// Exporting all functions
module.exports = { loadEvents, loadCommand };