const { addQuote } = require("../utils/functions")

module.exports = {
    name: 'quote', 
    aliases: ['q'], 
    permissions: [], 
    cooldown: 5,
    run: async(client, channel, userstate, context) => { 

        addQuote(client, channel, userstate, self, context)
    }
}