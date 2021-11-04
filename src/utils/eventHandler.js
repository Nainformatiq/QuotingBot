const { Client } = require('tmi.js');
const fs = require('fs');

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
  try {
    fs.readdirSync("./src/events/").forEach((file) => {
      const events = fs.readdirSync("./src/events/").filter((file) => file.endsWith(".js"));

      for (let file of events) {
        let pull = require(`../events/${file}`);
        if (pull.name) {
          client.events.set(pull.name, pull);
        }
      }
      console.log((`L'event ${file} à été lacé avec succès`));
    });
  } catch (e) {
    console.log(e.message);
  }
}