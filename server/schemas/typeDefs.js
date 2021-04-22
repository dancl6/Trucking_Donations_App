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
    password: String
    phoneNumber: String
    loads: [Load]

}

type Dock_User {
    _id: ID
    name: String
    streetAddress: String
    state: String
    zipcode: String
    rating: Float
    password: String
    loads: [Load]
    phoneNumber: String
}

type Query {
    truckingUser: Trucking_User
    dockUser: Dock_User
    truckingUsers: [Trucking_User]
    dockUsers: [Dock_User]
    loads: [Load]
}

type Mutation {
addLoad(streetAddress: String!, state: String!, zipcode: String!, donationItem: String!, trucker: ID!, currentStatus: String!): Load
addTruckingUser(userName: String!, password: String!,  phoneNumber: String): Auth_Trucking
addDockUser(name: String!, streetAddress: String!, state: String!,  zipcode: String!, rating: Float, password: String!,  phoneNumber: String ): Auth_Dock
truckingLogin(userName: String!, password: String!): Auth_Trucking
dockLogin(name: String!, password: String!): Auth_Dock
addLoadToDock(Dock_User: ID!, loadAdded: ID!) : Dock_User
addLoadToTrucker(Trucking_User: ID!, loadAdded: ID!) : Trucking_User
removeLoadTrucker(Trucking_User: ID!, loadRemoved: ID!) : Trucking_User
removeLoadDock(Dock_User: ID!, loadRemoved: ID!) : Dock_User
}
`;

module.exports = typeDefs