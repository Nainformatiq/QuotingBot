module.exports = {
    name: 'ping', 
    aliases: ['p'], 
    permissions: ['moderator', 'vip', 'broadcaster'], 
    cooldown: 5,
    run: async(client, channel, userstate, context) => { 

        await client.ping()
        .then((data) => {
            console.log('Ping command : ' + data);
            client.say(channel, `/me Pong ! Bloop le bot à une latence de ${data} secondes.`);
        }).catch((err) => {
            console.log(err);
        });
    }
}