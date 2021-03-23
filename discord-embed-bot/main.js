const Discord = require("discord.js");
const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
require('dotenv').config();
client.commands = new Discord.Collection();
const prefix = '>';
require('colors');
const fs = require('fs');

module.exports = {
    prefix,
    client
}

const commandfiles = fs.readdirSync('./commands');

for(const file of commandfiles){
    const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}

client.on('ready', () => {
    console.log('[INFO] '.green + 'Discord Embed Bot online!')
    client.user.setPresence({
        activity: {
            name: "with embeds!",
            type: "PLAYING"
        },
        status: 'online'
    })
})

client.on('shardError', error => {
    console.error('[ERROR]'.red + ' An unexpected error occurred: ', error);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'sendembed'){
        client.commands.get('sendembed').execute(message, args, Discord, client);
    } else if (command === 'editembed'){
        client.commands.get('editembed').execute(message, args, Discord, client);
    }

})
 
client.login(process.env.TOKEN).then(console.log('[INFO]'.green + ' Bot Logged In!'));
