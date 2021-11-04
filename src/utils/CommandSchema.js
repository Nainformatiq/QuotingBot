const joi = require('@hapi/joi');

const {permissions} = require('../../config');

const CommandSchema = joi.object({
    name: joi.string().min(1).max(32).required(),
    aliases: joi.array().items(joi.string()),
    permissions: joi.array().items(joi.string().valid(...permissions.validPerms)),
    cooldown: joi.number().required(),
    run: joi.function().required(),
});

module.exports = CommandSchema;