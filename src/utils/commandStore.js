const fs = require('fs');

const CommandSchema = require('./CommandSchema');

class CommandStore {

    /**
     * @constructor
     * @param {string} directory
     * @example
     */

    constructor(directory){
        this._directory = directory;
        this._loadAllCommands();
    };

    /**
     * @private
     * @returns {Void}
     */

     _loadAllCommands() { // todo: add support for nested folders
        this._commands = [];
        const files = fs.readdirSync(this._directory).filter(file => file.endsWith('.js'));
        files.forEach(file => {
            try {
                const command = require(`${this._directory}${file}`);
                const validated = CommandSchema.validate(command);
                if(validated.error == null) { 
                    console.info(`La commande : ${file} à été chargée.`);
                    this._commands.push(command);
                } else {
                    console.warn(`La commande : ${file} n'à pas été chargée. Validation: ${validated.error}`);
                }
            } catch (error) {
                console.warn(`La commande : ${file} n'à pas été chargée. ${error}`);
            }
        });
    }

    /**
     * @public
     * @param {String} commandName 
     * @returns {Object}
     */
    
    getCommand(commandName) {
        let found = this._commands.find(cmd => cmd.name === commandName) || this._commands.find(cmd => cmd.aliases.includes(commandName));
        if(!found) return null;
        return found;
    }
};
module.exports = {
    CommandStore
}