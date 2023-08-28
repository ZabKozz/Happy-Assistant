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
module.exports= capitalizeFirstLetter;