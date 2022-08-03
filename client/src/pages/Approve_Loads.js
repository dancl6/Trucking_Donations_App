import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { LOAD_QUERY, QUERY_ME,GET_TRUCKER_LOADS } from "../utils/queries";
import { ADD_LOAD_DOCK, ADD_DOCK_TO_LOAD } from "../utils/mutations"
import { useStoreContext } from '../utils/GlobalState';

import Button  from 'react-bootstrap/Button'
import Accordion from 'react-bootstrap/Accordion'
// // function Trucker_Signup() {
const Approve_Loads = () => {
  const [state] = useStoreContext();
  const [formState, setFormState] = useState({ state: '' });
const {data} = useQuery(GET_TRUCKER_LOADS);
const {data: data2} = useQuery(QUERY_ME);
const [addDockToLoad, {data:data4, error }] = useMutation(ADD_DOCK_TO_LOAD);
console.log("data for loads is:", data)
const [savedLoads, setSavedLoads] = useState();
const [ dockApprove, setDockApprove ] = useState();
const [ loadApprove, setLoadApprove ] = useState();
let dock_Req = []
for ( let i = 0 ; i < data?.getTruckerLoads.length; i ++ ) {  
  if(data.getTruckerLoads[i].dock_Requests.length > 0){
      dock_Req.push(data.getTruckerLoads[i])
  }
}
console.log("dock recks is:", dock_Req)



const handleApproveLoad = async() => {
  console.log("data 2 for add load dock is:",data2)




  try {
// console.log("trucking id is this:", data?.trucker_Id.truck)
    await addDockToLoad({
      // variables: { ...data }
      variables: {
         loadId: loadApprove, dockId: dockApprove
      }
    })

      // console.log("data4 from add load is:", data4.addLoad._id)        
  } catch (e) {
    console.error(e);
    let test = e
    console.log("testing error is:", e)
  }
      
  // window.location.reload(false)
  
  console.log("data for load is:", loadApprove, "data for dock is:", dockApprove)
  
}


  const handleFormSubmit = async event => {
    event.preventDefault();
    let stateInput = document.getElementById('state').value
    let savedLoads2 = []
    try {
    //   const { data } = await addTruckingUser({
    //     variables: { ...formState }
    //   });
    for ( let i = 0 ; i < data.loads.length; i ++ ) {
      console.log("data cons is :", data.loads[i])
      if(data.loads[i].state === stateInput) {
        savedLoads2.push(data.loads[i])
      }
    }
      console.log("input is:", document.getElementById('state').value)
      console.log("Data is:", data)
      console.log("saved loads is:", savedLoads2) 
    } catch (e) {
      console.error(e);
    }
    // console.log(error)
    setSavedLoads(savedLoads2)
    console.log("saved laosds is:", savedLoads)
  }
  
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  if (Auth.loggedIn() && data2?.me.trucker) {
  return (
    <div>
      {/* <h4 className='card-header center_text'>Search For Loads In This State</h4>
      <div className='card-body center_text'>
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2 center_text">
          <label htmlFor="userName">State in US:</label>
          <input
            placeholder="State"
            name="state"
            type="state"
            id="state"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row flex-end center_text">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div> */}
          <div>
          
          
          { 
            dock_Req?.map(item =>
            item  ?
            (

            <div key = {`ParentDiv1_${item._id}`}     >
       
                <div key = {`ParentDiv2_${item._id}`}>
            {/* <Link to={`/modify_load/${item._id}`} key = "link"> */}
            {/* <Button key = {item._id} variant="primary">Update Load</Button> */}
          {/* </Link> */}
          <div>
              {item?.dock_Requests.map(item2 => 
                  <div>{item2}
                  
                  <Button   onClick={() => {
                // let loadApprove = item._id
                console.log("iteming is 2:", item2)
                setLoadApprove(item2)
                setDockApprove(item._id)
                handleApproveLoad()
                // myLoads = myLoads.filter(test => {return test._id !== loadRemoved} )

                // console.log(" my new loads after delete is:", myLoads)
            }
              }  key = {item._id} variant="primary">Approve</Button>
                  
                  
                  </div>      
              )}


          </div>
          <div >

          </div>
                <div key = {item._id}>
                  {item.state} {item.currentStatus} {item._id}
                </div>
                </div>
                </div>
       
            ): null)}


          </div>



    </div>
  );
            } else { return null}
}

export default Approve_Loads;
