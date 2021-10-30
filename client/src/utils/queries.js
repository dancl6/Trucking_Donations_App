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

export const LOAD_QUERY = gql`
{
	loads {
_id 
 number
state
    donationItem
    rating
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
query getLoad($loadId:[ID]!){
  getLoad(loadId: $loadId){
   _id

 } 
 }
`;

export const GET_TRUCKER_LOADS = gql`
{
  getTruckerLoads{
    _id
  }
}
`;