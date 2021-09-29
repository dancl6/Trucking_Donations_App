import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { GET_TRUCKER_LOADS } from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState'

const My_Loads = () => {
    const {data} = useQuery(GET_TRUCKER_LOADS);
    const [state, dispatch] = useStoreContext();



    console.log("data for my loads is:", data?.getTruckerLoads[0])
return (
    <div>
        {data?.getTruckerLoads.map(load => (
           <p>
               <span>State: {load.state}</span>               
               <span>Street Address: {load.streetAddress}</span>
               <span>Donation Item: {load.donationItem}</span>
               
           </p> 
        ))}
    </div>
)

}

export default My_Loads;