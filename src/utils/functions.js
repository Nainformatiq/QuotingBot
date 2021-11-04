const config = require('../../config')
const db = require('../db/quotes.json')

module.exports.getQuote = getQuote;
module.exports.getSentence = getSentence;
module.exports.replacedefaultmessages = replacedefaultmessages;
module.exports.addQuote = addQuote;


async function addQuote(client, channel, userstate, self, context){
    
    const chan = channel.substr(1)
    console.log(db[chan][0])

    const mentionnedUser = context[0].toLowerCase();

    var mentionnedUserId = "";

    const twitchHeader = {
        headers: {
          "Client-ID": config.twitch.clientId,
          Authorization: `Bearer ${config.twitch.password}`
        },
    };

    const urlUserID = `https://api.twitch.tv/helix/users?login=${mentionnedUser}`;
    
    try {
        const response = await axios.get(urlUserID, twitchHeader).catch((err) => console.log(err));
        const res = await response.data;

        const broadcasterID = res.data[0].id;

        const urlSubs = `https://api.twitch.tv/helix/users/follows?to_id=${broadcasterID}`;

        const response2 = await axios.get(urlSubs, twitchHeader).catch((err) => console.log(err));
        const res2 = await response2.data;

        client.say(channel, `Rainbow à actuellement ${res2.total} followers raiiin4Love Merci à vous pour votre soutien !`);


    } catch (e) {
        console.log(e);
    }

    const quote = context.splice(1).join(' ');

}

async function getSentence(){

    const sentences = config.sentences;

    var n = (sentences.length - 1);

    const number = getRandomNumber(0, n);

    const finalSentence = sentences[number];

    return finalSentence;

}

async function getQuote(){

}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

function getDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1);
    const day = today.getDate();

    const date = `${day}/${month}/${year}`;

    return date;
};

function replacedefaultmessages(channel, userstate, context, text){

    if(!text || text == undefined || text == null) throw "Aucun texte pour le message replacedefault ajouté comme premier paramètre";
    
    return String(text)
      .replace(/%{time}%/gi, '1' )
      .replace(/%{quote}%/gi, '2')
      .replace(/%{user}%/gi, "3")
      
};

function getUsername(){

}