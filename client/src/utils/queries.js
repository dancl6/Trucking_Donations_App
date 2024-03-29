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
      state

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

export const LOAD_QUERY = gql`
{
	loads {
_id 
confirmed
currentStatus
 number
 dock_Requests
state
    donationItem
    rating_dock
    rating_trucker
trucker {
  _id
}
    dock {
      _id
    }
  }
}
`;

export const TRUCK_ID_IS = gql`
{
  trucker_Id{
truck
  
 }
}
`;

export const GET_LOAD = gql`
query getLoad($_id:ID!){
  getLoad(_id: $_id){
    _id
    state
    zipcode
    streetAddress
    donationItem
    number
    comments
    trucker {
      _id
    }
    currentStatus
    dock {
      _id
    }
    rating_trucker
    rating_dock
    confirmed
    dateStart

    dateEnd

 } 
 }
`;

export const GET_TRUCKER_LOADS = gql`
{
  getTruckerLoads{
    _id
    state
    zipcode
    streetAddress
    donationItem
    number
    comments
    trucker {
      _id
    }
    currentStatus
    dock {
      _id
    }
    rating_trucker
    rating_dock
    confirmed
    dateStart

    dateEnd
    dock_Requests
  }
}
`;