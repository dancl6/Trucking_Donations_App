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