import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { LOAD_QUERY } from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState';

import Button from 'react-bootstrap/Button'
// // function Trucker_Signup() {
const Search_Loads = () => {
  const [state] = useStoreContext();
  const [formState, setFormState] = useState({ state: '' });
const {data} = useQuery(LOAD_QUERY);
console.log("data for loads is:", data)
const [savedLoads, setSavedLoads] = useState();

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


  return (
    <div>
      <h4 className='card-header center_text'>Search For Loads In This State</h4>
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
        {/* <div className="flex-row space-between my-2 center_text">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            placeholder="Phone Number"
            name="phoneNumber"
            type="phoneNumber"
            id="phoneNumber"
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="youremail@test.com"
            name="email"
            type="email"
            id="email"
            onChange={handleChange}
          />
        </div> */}
        {/* <div className="flex-row space-between my-2 center_text">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Password"
            name="password"
            type="password"
            id="password"
            onChange={handleChange}
          />
        </div> */}
        <div className="flex-row flex-end center_text">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
          
            { 
            savedLoads?.map(item =>
            item  ?
            (

            <div key = {`ParentDiv1_${item._id}`}>
       
                <div key = {`ParentDiv2_${item._id}`}>
            {/* <Link to={`/modify_load/${item._id}`} key = "link"> */}
            {/* <Button key = {item._id} variant="primary">Update Load</Button> */}
          {/* </Link> */}
          <div >

          </div>
                <div key = {item._id}>
                  {item.state} {item.currentStatus} {item._id}
                </div>
                </div>
                </div>
       
            ): null)}





    </div>
  );

}

export default Search_Loads;
