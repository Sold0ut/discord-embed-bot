const Discord = require('discord.js');
const { client } = require('../main');

module.exports = {
    name: 'editembed',
    description: 'Edit a send embed!',
    minargs: 2,
    expectedArgs: '<Channel mention> <Message ID> <JSON>',
    execute(message, args) {

        const targetChannel = message.mentions.channels.first();

        const targetMessage = args[1];

        if (!targetMessage) {
            message.reply(' Please select a the channel in witch the embed is in and an message id! Channel needs to be mentioned. - >editembed [#channel id] [message id] [new JSON Code]');
            return;
        }

        if (isNaN(targetMessage)) {
            message.reply(' Target Message is not a Message ID!')
            return;
        }

const targetMessage1 = targetChannel.messages.fetch(targetMessage).then(message => {
    var selMessage = message;

        try {
            //remove Message ID 
            let ArgsWOPosition = args.slice(2).join(' ');

            //get JSON Data
            const json = JSON.parse(ArgsWOPosition);
            const { text = '' } = json

            //send Embed 
            selMessage.edit(text, { 
                embed: json,
            })
        } catch (error) {
            console.log(error)
        }
    })
}
}