const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Auth {
    token: ID
    user: User
}

type Mutation {
addTruckingUser(userName: String!, password: String!, loads: [ID]): Auth
addDockUser(name: String!, streetAddress: String!, state: String!,  zipcode: String!, rating: Float, password: String!, loads: [ID] ): Auth
}
`;

module.exports = typeDefs