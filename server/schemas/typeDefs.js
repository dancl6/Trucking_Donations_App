const { gql } = require('apollo-server-express');
const { ScalarNameTypeDefinition } = require('graphql-scalars');
const { ScalarNameResolver } = require('graphql-scalars');
const { typeDefs: scalarTypeDefs } = require('graphql-scalars');
// import {GraphQLList} from 'graphql'



const typeDefs = [

// ScalarNameTypeDefinition,
 ...scalarTypeDefs,

gql`


type Auth_Trucking {
    token: ID
    truckingUser: Trucking_User
}

type Auth_Dock {
    token: ID
    dockUser: Dock_User
}

input DateType {
  day: Int
  month: Int
  hour: Int
  minute: Int
  year: Int
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
    rating_dock: Boolean
    rating_trucker: Boolean
    confirmed: Boolean
    dateStart: String
    dateEnd: String
    dock_Requests: [String]
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
  rating_dock: Boolean
  rating_trucker: Boolean
  confirmed: Boolean
  dock_Requests: [String]
  
}

type Trucking_User {
    _id: ID
    userName: String
    password: String
    phoneNumber: String
    loads: [Load]
    dot: Int

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


type truck_ID {
  truck: ID
}

type OneLoad {
  TheLoad: Load
}

type Query {
    truckingUser: Trucking_User
    dockUser2: [Dock_User]
    dockUser: Dock_User
    truckingUsers: [Trucking_User]
    dockUsers: [Dock_User]
    loads: [LoadForQueries]
    me: Boolean_Return
    trucker_Id: truck_ID
    getLoad(_id: ID!): Load
    getTruckerLoads: [Load]
    getLoads: [Load]
}


type Mutation {
addLoad(streetAddress: String!, state: String!, zipcode: String!, donationItem: String!, number: Int!, comments: String, trucker: ID!, currentStatus: String!, dock:ID, rating_dock: Boolean, rating_trucker: Boolean,  confirmed: Boolean!, dateStart: String!,  dateEnd: String!): Load
addTruckingUser(userName: String!, password: String!,  phoneNumber: String, dot: Int): Auth_Trucking
addDockUser(name: String!, streetAddress: String!, state: String!,  zipcode: String!, rating: Float, password: String!,  phoneNumber: String ): Auth_Dock
truckingLogin(userName: String!, password: String!): Auth_Trucking
dockLogin(name: String!, password: String!): Auth_Dock
addLoadToDock(loadAdded: ID!) : Dock_User
addLoadToTrucker(Trucking_User: ID!, loadAdded: ID!) : Trucking_User
removeLoadFromTrucker( loadRemoved: ID!, truckerId: ID!) : Load
removeLoadDock(Dock_User: ID!, loadRemoved: ID!) : Dock_User
addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
updateLoad(LoadId: ID!, streetAddress: String!, state: String!, zipcode: String!, donationItem: String!, number: Int!, comments: String, trucker: ID!, currentStatus: String!, dock:ID, rating_trucker: Boolean, rating_dock: Boolean, confirmed: Boolean, dateStart: String!, dateEnd: String!): Load
getLoad2(loadId: ID!): Load
removeNullTruckerLoad: Trucking_User
removeLoad(loadRemoved: ID!) : Load
removeLoadFromTruck(loadId: ID!, truckerId: ID!) : Trucking_User
addRequestedDocks(loadId: ID!) : Load
addDockToLoad(loadId: ID!, dockId: ID!) : Load
}
`];

module.exports = typeDefs