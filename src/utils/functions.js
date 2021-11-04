const config = require('../../config')

module.exports.getQuote = getQuote;
module.exports.getSentence = getSentence;
module.exports.replacedefaultmessages = replacedefaultmessages;
module.exports.addQuote = addQuote;


async function addQuote(client, channel, userstate, message, self, context){

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