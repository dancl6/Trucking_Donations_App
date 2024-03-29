import gql from 'graphql-tag';

export const ADD_DOCK_USER = gql`
  mutation addDockUser($name: String!, $streetAddress: String!, $state: String!, $zipcode: String!, $rating: Float, $password: String!, $phoneNumber: String) {
    addDockUser(name: $name, streetAddress: $streetAddress, state: $state, zipcode: $zipcode, rating: $rating, password: $password, phoneNumber: $phoneNumber) {
      token
      dockUser {
          _id
      }
    }
  }
`;

export const ADD_TRUCKING_USER = gql`
  mutation addTruckingUser($userName: String!, $phoneNumber: String!, $password: String!, $dot: Int! ) {
      addTruckingUser(userName: $userName, phoneNumber: $phoneNumber , password: $password, dot: $dot) {
      token
      truckingUser {
          _id
      }
  }
}
`;

export const ADD_LOAD = gql`
mutation addLoad($streetAddress: String!, $state: String!, $zipcode: String!, $donationItem: String!, $trucker:ID!, $currentStatus: String!, $number: Int!,$comments:String, $dock:ID, $rating_trucker: Boolean, $rating_dock: Boolean, $confirmed: Boolean!, $dateStart: String!, $dateEnd: String!) {
  addLoad(streetAddress: $streetAddress, state: $state, zipcode: $zipcode, donationItem: $donationItem, trucker:$trucker, currentStatus:$currentStatus, number:$number, comments:$comments, dock:$dock, rating_trucker: $rating_trucker, rating_dock:$rating_dock, confirmed: $confirmed, dateStart: $dateStart,  dateEnd: $dateEnd) {
    _id
    
  }
}
`;


export const ADD_LOAD_DOCK = gql `
mutation addLoadToDock( $loadAdded: ID!){
       addLoadToDock( loadAdded: $loadAdded){
    _id
  }
}
`

export const ADD_REQ_DOCK_TO_LOAD = gql `
mutation addRequestedDocks($loadId: ID!){
            addRequestedDocks(loadId: $loadId){
    _id
  }
}
`
export const ADD_DOCK_TO_LOAD = gql `
mutation addDockToLoad($loadId: ID!, $dockId: ID!){
            addDockToLoad(loadId: $loadId, dockId: $dockId){
    _id
  }
}
`


export const ADD_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const LOGIN_TRUCKER = gql`
  mutation truckingLogin($userName: String!, $password: String!) {
    truckingLogin(userName: $userName, password: $password) {
      token

    }
  }
`;

export const LOGIN_DOCK = gql`
  mutation  dockLogin($name: String!, $password: String!) {
    dockLogin(name: $name, password: $password) {
      token

    }
  }
`;

export const UPDATE_LOAD = gql`
mutation updateLoad($LoadId: ID!,$streetAddress: String!, $state: String!, $zipcode: String!, $donationItem: String!, $trucker:ID!, $currentStatus: String!, $number: Int!,$comments:String, $dock:ID, $rating_trucker:Boolean, $rating_dock: Boolean, $confirmed: Boolean!, $dateStart: String!, $dateEnd: String!) {
  updateLoad(LoadId: $LoadId,streetAddress: $streetAddress, state: $state, zipcode: $zipcode, donationItem: $donationItem, trucker:$trucker, currentStatus:$currentStatus, number:$number, comments:$comments, dock:$dock, rating_trucker:$rating_trucker, rating_dock: $rating_dock, confirmed: $confirmed, dateStart: $dateStart,  dateEnd: $dateEnd) {
   _id
    
  }
}
`;


export const GET_LOAD2 = gql`
mutation getLoad2($loadId:ID!){
  getLoad2(loadId: $loadId){
   _id
    state
 }
 }
 `;

 export const REMOVE_LOAD = gql`
 mutation removeLoad($loadRemoved: ID!) {
  removeLoad(loadRemoved: $loadRemoved) {
_id
  }
}
 `