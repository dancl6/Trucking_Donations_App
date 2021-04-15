const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Auth {
    token: ID
    user: User
}

type Mutation {
addTruckingUser(userName: String!, password: String!, loads: [ID], phoneNumber: String): Auth
addDockUser(name: String!, streetAddress: String!, state: String!,  zipcode: String!, rating: Float, password: String!, loads: [ID], phoneNumber: String ): Auth
}
`;

module.exports = typeDefs