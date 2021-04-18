const { gql } = require('apollo-server-express');

const typeDefs = gql`

type Auth_Trucking {
    token: ID
    truckingUser: Trucking_User
}

type Auth_Dock {
    token: ID
    dockUser: Dock_User
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
    rating: Float
}

type Trucking_User {
    _id: ID
    userName: String
    phoneNumber: String
    loads: [Load]

}

type Dock_User {
    name: String
    streetAddress: String
    state: String
    zipcode: String
    rating: Float
    loads: [Load]
    phoneNumber: String
}

type Query {
    truckingUser: Trucking_User
    dockUser: Dock_User
}

type Mutation {
addTruckingUser(userName: String!, password: String!,  phoneNumber: String): Auth_Trucking
addDockUser(name: String!, streetAddress: String!, state: String!,  zipcode: String!, rating: Float, password: String!,  phoneNumber: String ): Auth_Dock
}
`;

module.exports = typeDefs