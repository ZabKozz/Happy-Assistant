const { glob } = require('glob');
const { promisify } = require('util');
const proGolb = promisify(glob);

/**
 * Function responsible for searching for files ending in '.js'
 * (The phrase 'dirName' is used when using the function otherwise the name of the folder in which to search)
 */
async function loadFiles(dirName) {
    const Files = await proGolb(`${process.cwd().replace(/\\/g, "/")}/${dirName}/**/*.js`);
    Files.forEach((file) => delete require.cache[require.resolve(file)]);
    return Files;
}
// Exporting functions
module.exports = loadFiles;