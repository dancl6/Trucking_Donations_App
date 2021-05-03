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
  mutation addTruckingUser($userName: String!, $phoneNumber: String!, $password: String! ) {
      addTruckingUser(userName: $userName, phoneNumber: $phoneNumber , password: $password) {
      token
      truckingUser {
          _id
      }
  }
}
`;

export const ADD_LOAD = gql`
  mutation addLoad($streetAddress: String!, $state: String!, $zipcode: String!, $donationItem: String!, $trucker: String!, $currentStatus: String!, $dock: String! ) {
      addLoad(userName: $userName, password: $password, phoneNumber: $phoneNumber) {
      token

  }
}
`;


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