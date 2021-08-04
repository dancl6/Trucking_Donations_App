import gql from 'graphql-tag';

export const QUERY_TRUCKING_USERS = gql`
{
	truckingUsers {
		_id
 	   userName
    password
    phoneNumber
    loads {
      _id
    }
    
  }
}
`


export const QUERY_ME = gql`
{
  me {
    trucker
    docker
  }
}
`;

export const QUERY_LOADS_STATE = gql`
{
  loadsInAState {
    _id
    state
  }
}
`;