module.exports = {
    name: 'sendembed',
    description: 'Send an Custom Embed!',
    minargs: 2,
    expectedArgs: '<Channel mention> <JSON>',
    execute(message, args) {

        const targetchannel = message.mentions.channels.first()
        if (!targetchannel) {
            message.reply(' Bitte gebe einen Channel an, in dem dein Embed gesendet werden soll.');
            return;
        }

        try {
        // removes the Channel Mention
        args.shift()

        // get json Data
        const json = JSON.parse(args.join(' '))
        const { text = '' } = json

        // send Embed
        targetchannel.send(text, { 
            embed: json,
        })
        } catch(error) {
            message.reply(` Ein unerwarteter Fehler ist aufgetreten: ` + error.message);
        }
    }
}