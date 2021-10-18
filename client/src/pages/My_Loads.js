import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { GET_LOAD2 } from "../utils/mutations";
import { GET_TRUCKER_LOADS, GET_LOAD } from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState'
import { TRUCKER_LOADS } from "../utils/actions";
import GetLoad from "./GetLoad"

const My_Loads = () => {
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
// const [getLoad2] = useMutation(GET_LOAD2)
    const {loading: loading2, data: data2 } = useQuery(GET_LOAD)
const handleGetLoad = async (loadId) => {
    // loadId = "6142bdb9b88e8e5794462379"
try {
    await data2({
        variables: {loadId}
    })
} catch (e) {

}
}


    console.log("data for my loads is:", data?.getTruckerLoads, "and next is:", handleGetLoad("6142bdb9b88e8e5794462379"))
return (
    <div>
        {data?.getTruckerLoads.map(load => (
            <div>
            <div>    {data2(load._id) ? (<span>{data2(load._id)}</span>) : ''       }</div>
            
           <p>
               {/* <span>State: {data2.state}</span>                */}
                   
           </p>
           </div> 
        ))}
    </div>
)

}

export default My_Loads;