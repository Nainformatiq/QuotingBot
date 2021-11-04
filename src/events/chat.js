const client  = require('../../server');
const config = require('../../config');

const { CommandStore } = require('../utils/commandStore');

const cooldown = new Set();
const prefix = config.bot.prefix

const commands = new CommandStore(
    process.cwd() + '/src/commands/'
);

const isUserPermitted = require('../utils/isUserPermited');

client.on('chat', async(channel, userstate, message, self) => {

    if(!message.startsWith(prefix)) return;

    const context = message.slice(prefix.length).split(/ +/);
    const commandName = context.shift().toLowerCase();
    const command = commands.getCommand(commandName);

    //console.log(context[0].toLowerCase())

    const user = {
        username: userstate.username,
        displayName: userstate["display-name"],
        userId: userstate['user-id'],
        color: userstate?.color ?? "#FFFFFF",
        isChat: userstate["message-type"] == "chat",
        isAction: userstate['message-type'] == 'action',
        badgeInfo: userstate['badge-info'],
    };

    if(command !== null) {
        
        if(isUserPermitted(userstate['badges'], command.permissions)){

            if(cooldown.has(user.userId, commandName)){
                client.say(channel, `@${user.username} Il y a un cooldown de ${command.cooldown}s sur cette commande attendez un peut !`)
            }else {
                await command.run(client, channel, userstate, message, self, context);
            }

            if(Boolean(command.cooldown) === true){
                cooldown.add(user.userId, commandName);
                setTimeout(() => {
                    cooldown.delete(user.userId, commandName);
                }, (command.cooldown * 1000));

            }else{
                return
            }
        }
        else {
            await client.say(channel, `@${userstate['display-name']} - Vous devez avoir le(s) badges suivant(s) : ${String(command.permissions).replace(',', ' ou ')} pour utiliser cette commande !`);
        }
        
    } else return;
});