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
    number: Int
    comments: String
    trucker: Trucking_User
    currentStatus: String
    dock: Dock_User
    rating: Float
    confirmed: Boolean
    dateStart: Float
    timeStart: Float
    timeDuration: Float
}

type LoadForQueries {
  _id: ID
  streetAddress: String
  state: String
  zipcode: String
  donationItem: String
  number: Float
  comments: String
  trucker: Trucking_User
  currentStatus: String
  dock: Dock_User
  rating: Float
  timeDuration: Float
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

type Category {
    _id: ID
    name: String
  }

type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

type Auth {
    token: ID
    user: User
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }
  
  
type Boolean_Return {
  trucker: Boolean
  docker: Boolean
}

type Query {
    truckingUser: Trucking_User
    dockUser: Dock_User
    truckingUsers: [Trucking_User]
    dockUsers: [Dock_User]
    loads: [LoadForQueries]
    me: Boolean_Return

}


type Mutation {
addLoad(streetAddress: String!, state: String!, zipcode: String!, donationItem: String!, number: Int!, comments: String, trucker: ID!, currentStatus: String!, dock:ID, rating: Float, confirmed: Boolean!, dateStart: Float!, timeStart: Float!, timeDuration: Float!): Load
addTruckingUser(userName: String!, password: String!,  phoneNumber: String): Auth_Trucking
addDockUser(name: String!, streetAddress: String!, state: String!,  zipcode: String!, rating: Float, password: String!,  phoneNumber: String ): Auth_Dock
truckingLogin(userName: String!, password: String!): Auth_Trucking
dockLogin(name: String!, password: String!): Auth_Dock
addLoadToDock(Dock_User: ID!, loadAdded: ID!) : Dock_User
addLoadToTrucker(Trucking_User: ID!, loadAdded: ID!) : Trucking_User
removeLoadTrucker(Trucking_User: ID!, loadRemoved: ID!) : Trucking_User
removeLoadDock(Dock_User: ID!, loadRemoved: ID!) : Dock_User
addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
updateLoad(_id: ID!, streetAddress: String!, state: String!, zipcode: String!, donationItem: String!, number: Int!, comments: String, trucker: ID!, currentStatus: String!, dock:ID, rating: Float, confirmed: Boolean, dateStart: Float!, timeStart: Float!, timeDuration: Float!): Load
}
`;

module.exports = typeDefs