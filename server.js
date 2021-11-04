////////////////////////
// IMPORT DES MODULES //
////////////////////////

const { Client } = require('tmi.js'); // Module for communicate with twitch API.
const fs = require('fs'); // Module pour intérragir avec le systèmes de fichier.

const conf = require('./config'); // Import du fichier de configuratiion.
const { getSentence, replacedefaultmessages } = require('./src/utils/functions');

const db = require('./src/db/quotes.json')
////////////////////////////////
// INITIALLISATION DU CLIENT //
//////////////////////////////

const client = new Client({

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

    channels: ['tiotbenjy'] //conf.channels,
});

module.exports = client;

//bot connexion

client.connect().then(() => {
    console.log('Je suis connecté à twitch ! \n')

}, () => {
    console.log('Aie il y a eu une erreur de connexion ...')
});

client.on('connected', (addr, port) => {
    console.log(`Bot connecté à : ${addr}:${port} \n`);
});


client.on('join', (channel, username, self) => {
    
    if (self) {
        console.log(`Je suis connecté sur la chaîne de : ${channel} \n`);
        //client.say(channel, 'Bot en ligne !')
        //client.say(channel, '/w tiotbenjy Le QuoteBot est lancé !');
    }

    
});


///////////////////////////////
//// CMDS & EVENT HANDLER ////
/////////////////////////////

client.events == new Set();
client.categories = fs.readdirSync("./src/commands/");


require(`./src/utils/eventHandler.js`)(client)
