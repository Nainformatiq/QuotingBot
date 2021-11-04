const axios = require('axios');
const fs = require('fs')

const config = require('../../config');
const db = require('../db/quotes.json');

module.exports.getQuote = getQuote;
module.exports.getSentence = getSentence;
module.exports.addQuote = addQuote;

const twitchHeader = {
    headers: {
    "Client-ID": config.bot.clientId,
    Authorization: `Bearer ${config.bot.token}`
    },
};

const sentences = [
    `On me dit à l'oreille qu'un jour %{userQuoted}% à dit : "%{quote}%". Merci à %{userQuote}%. `,
    `Le %{time}% %{userQuoted}% à dit : "%{quote}%". Merci à %{userQuote}%. `,  
    `Le %{time}% %{userQuoted}% à dit : "%{quote}%". Merci à %{userQuote}%. `,  
    `Le %{time}% %{userQuoted}% à dit : "%{quote}%". Merci à %{userQuote}%. `,  
];


async function addQuote(client, channel, userstate, message, self, context) {
    
    const chan = channel.substr(1)

    if(context.length === 0){
        client.say(channel, '/me Utilisation de la commande : !quote @viewer "message". Exemple : !quote @tiotbenjy "Bonjour le tchat !"')
    }else {
        const mentionnedUser = context[0].toLowerCase(); 

        if(!mentionnedUser.startsWith('@')){
            return client.say(channel, `@${userstate.username} Vous devez utiliser la commande comme ceci !quote @viewer "message". Exemple !quote @tiotbenjy "Bonjour le tchat"`)
        }else {

            var mentionnedUserId = "";

            const urlUserID = `https://api.twitch.tv/helix/users?login=${mentionnedUser.substr(1)}`;
            
            try {
                const response = await axios.get(urlUserID, twitchHeader).catch((err) => console.log(err));
                const res = await response.data;

                mentionnedUserId = res.data[0].id;

            } catch (e) {
                console.log(e);
            }

            const msg = context.splice(1).join(' ');

            if(!msg.startsWith(`"`)){

                if(!db[chan]) db[chan] = [];

                db[chan].unshift({
                    date: getDate(),
                    userMadeQuote: userstate['user-id'],
                    userQuoted: mentionnedUserId,
                    quote: msg,
                });

                fs.writeFileSync('./src/db/quotes.json', JSON.stringify(db, null, 2))

                client.say(channel, `/me @${userstate.username} Merci ! Ta citation à bien été entrgisté pour la chaine twitch de @${chan}`);
                
            }else{

                if(msg.startsWith(`"`)){
                    var find = `"`;
                    var re = new RegExp(find, 'g');

                    var newmsg = msg.replace(re, '');

                    if(!db[chan]) db[chan] = [];

                    db[chan].unshift({
                        date: getDate(),
                        userMadeQuote: userstate['user-id'],
                        userQuoted: mentionnedUserId,
                        quote: newmsg,
                    });

                    fs.writeFileSync('./src/db/quotes.json', JSON.stringify(db, null, 2));

                    client.say(channel, `/me @${userstate.username} Merci ! Ta citation à bien été entrgisté pour la chaine twitch de @${chan}`);

                }else if(msg.startsWith(`'`)) {
                    var find = `'`;
                    var re = new RegExp(find, 'g');

                    var newmsg = msg.replace(re, '');

                    if(!db[chan]) db[chan] = [];

                    db[chan].unshift({
                        date: getDate(),
                        userMadeQuote: userstate['user-id'],
                        userQuoted: mentionnedUserId,
                        quote: newmsg,
                    });

                    fs.writeFileSync('./src/db/quotes.json', JSON.stringify(db, null, 2));

                    client.say(channel, `/me @${userstate.username} Merci ! Ta citation à bien été entrgisté pour la chaine twitch de @${chan}`);

                }else{
                    return;
                }

            }
        }

    };   

}

function getSentence(nbre){

    const sentence = sentences[nbre];

    return sentence;

};

async function getQuote(channel){

    const chan = channel.substr(1)
    //console.log(db[chan][0])

    var n = (sentences.length - 1);

    const nbre = getRandomNumber(0, n);

    const txt = getSentence(nbre);

    console.log(txt)

    const quote = await replaceText(chan, nbre, txt)

    console.log(quote)

    return quote;
};

function getRandomNumber(min, max) {
    const nbre = Math.floor(Math.random() * (max - min + 1) + min);

    return nbre;
};

function getDate() {
    const today = new Date();

    const year = today.getFullYear();
    const month = (today.getMonth() + 1);
    const day = today.getDate();

    const date = `${day}/${month}/${year}`;

    return date;
};

async function replaceText(channel, number, text){

    //console.log(channel, number)

    if(!text || text == undefined || text == null) return 'erreur';
    
    //console.log(db[channel][number].date)

    //if(text.includes())

    const umq = await getUsername(db[channel][number].userMadeQuote);
    const uq = await getUsername(db[channel][number].userQuoted);

    return String(text)
        .replace(/%{time}%/gi, db[channel][number].date)
        .replace(/%{userQuote}%/gi, `@${umq}`)
        .replace(/%{userQuoted}%/gi, `@${uq}`)
        .replace(/%{quote}%/gi, db[channel][number].quote)
        
};

async function getUsername(userId){

    var username;

    const urlUserID = `https://api.twitch.tv/helix/users?id=${userId}`;
            

    await axios.get(urlUserID, twitchHeader)
    .then((res) => {
        username = res.data.data[0].login;

        console.log(username)
    })
    .catch((err) => console.log(err)); 

    return username;

}