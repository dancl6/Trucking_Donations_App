import gql from 'graphql-tag';

export const ADD_DOCK_USER = gql`
  mutation addDockUser($name: String!, $streetAddress: String!, $state: String!, zipcode: String!, rating: Float, $password: String!, $phoneNumber: String) {
    addDockUser(name: $name, streetAddress: $streetAddress, state: $state, zipcode: $zipcode, rating: $rating, password: $password, phoneNumber: $phoneNumber) {
      token

    }
  }
`;

export const ADD_TRUCKING_USER = gql`
  mutation addTruckingUser($userName: String!, $password: String!, $phoneNumber: String! ) {
      addTruckingUser(userName: $userName, password: $password, phoneNumber: $phoneNumber) {
      token

  }
}
`;