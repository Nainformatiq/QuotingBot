////////////////////////
// IMPORT DES MODULES //
////////////////////////

const { Client } = require('tmi.js'); // Module for communicate with twitch API.
const fs = require('fs'); // Module pour intérragir avec le systèmes de fichier.

const conf = require('./config'); // Import du fichier de configuratiion.
const { getSentence, replacedefaultmessages } = require('./src/utils/functions');

////////////////////////////////
// INITIALLISATION DU CLIENT //
//////////////////////////////

/**const client = new Client({

    options: {
        debug: true,
    },

    connection: {
        reconnect: true,
        secure: true,
        timeout: 180000,
        reconnectDecay: 1.4,
        reconnectInterval: 1000,
    },

    identity: {
        username: conf.bot.username,
        password: 'oauth:' + conf.bot.token
    },

    channels: conf.channels,
});

module.exports = client;*/

///////////////////////////////
//// CMDS & EVENT HANDLER ////
/////////////////////////////

/**client.events == new Set();
client.categories = fs.readdirSync("./src/commands/");


require(`./src/utils/eventHandler.js`)(client)*/
