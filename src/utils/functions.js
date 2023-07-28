const { glob } = require('glob');
const { promisify } = require('util');
const proGolb = promisify(glob);

/**
 * Function responsible for searching for files ending in '.js'
 * (The phrase 'dirName' is used when using the function otherwise the name of the folder in which to search)
 */
async function loadFiles(dirName) {
    const Files = await proGolb(`${process.cwd().replace(/\\/g, "/")}${dirName}/**/**/*.js`);
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}
// The function responsible for enlarging the first letter of a string to uppercase
function capitalizeFirstLetter(string) {
    // If no value is specified
    if (!string) {
        // Naming "No name provided"
        string = 'No name provided';
        // Specifying a new value
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    else {
        // Providing a revised value
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
// Exporting functions
module.exports= {loadFiles, capitalizeFirstLetter};