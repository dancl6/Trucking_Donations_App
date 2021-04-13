const { AuthenticationError } = require('apollo-server-express');
const { Trucking_User, Dock_User, Load } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {

    },
    Mutation: {

    }

}

module.exports = resolvers;