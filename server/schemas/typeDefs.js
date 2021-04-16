const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Auth {
    token: ID
    user: User
}

type Load {
    _id: ID
    streetAddress: String
    state: String
    zipcode: String
    donationItem: String
    comments: String
    trucker: Trucking_User
    currentStatus: String
    dock: Dock_User
    rating: Number
}

type Trucking_User {
    _id: ID
    userName: String
    phoneNumber: String
    loads: [Load]
    phoneNumber: String
}

type Dock_User {
    name: String
    streetAddress: String
    state: String
    zipcode: String
    rating: Number
    loads: [Load]
    phoneNumber: String
}

type Query {
    truckingUser: Trucking_User
}

type Mutation {
addTruckingUser(userName: String!, password: String!,  phoneNumber: String): Auth
addDockUser(name: String!, streetAddress: String!, state: String!,  zipcode: String!, rating: Float, password: String!,  phoneNumber: String ): Auth
}
`;

module.exports = typeDefs