import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { GET_TRUCKER_LOADS } from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState'
import { TRUCKER_LOADS } from "../utils/actions";


const My_Loads = () => {
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    const [state, dispatch] = useStoreContext();
    const { Trucker_Loads } = state;
// dispatch({
//     type: TRUCKER_LOADS,
//     Trucker_Loads: data?.getTruckerLoads
// })
var sum = 0
let test = data?.getTruckerLoads.map(load => {
    sum = sum + 1
     objName = "obj" + sum
console.log(load)
})

useEffect(() => {
    if (data) {
        dispatch({
            type:GET_TRUCKER_LOADS,
            Trucker_Loads: data.getTruckerLoads
        })
    }
    // console.log(`RERENDER: STATE IS`, state.);
  }, [data, loading, dispatch]);
  

    console.log("data for my loads is:", data?.getTruckerLoads, "and", Trucker_Loads)
return (
    <div>
        {data?.getTruckerLoads.map(load => (
           <p>
               <span>State: {load._id}</span>               
               {/* <span>Street Address: {load.streetAddress}</span>
               <span>Donation Item: {load.donationItem}</span> */}
               
           </p> 
        ))}
    </div>
)

}

export default My_Loads;