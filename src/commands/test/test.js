module.exports.help = {
    name: 'test',
    aliases: ['test', 't'],
    author: 'ZabKoz',
    icon: '',
    description: 'It does nothing in particular',
    usage: `${process.env.client_Prefix}test`
}

module.exports.run = (client, message, args) =>{
    // Code
    message.channel.send('Test')
}