module.exports = {
    name: 'sendembed',
    description: 'Send an Custom Embed!',
    minargs: 2,
    expectedArgs: '<Channel mention> <JSON>',
    execute(message, args) {

        const targetchannel = message.mentions.channels.first()
        if (!targetchannel) {
            message.reply(' Please select a Channel to send the embed! - >sendembed [#channelid] [JSON Code]');
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
        } catch(err) {
            message.reply(` An unexpected error occurred: ` + err.message);
        }
    }
}
