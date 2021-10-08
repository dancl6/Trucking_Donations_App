import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { GET_TRUCKER_LOADS, GET_LOAD } from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState'
import { TRUCKER_LOADS } from "../utils/actions";


const My_Loads = () => {
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    const [state, dispatch] = useStoreContext();
    const { Trucker_Loads } = state;
    const {loading: loading2,  data2 } = useQuery(GET_LOAD)
    const getLoadInfo = async (loadId)  => {
 
            // data2 ({
            //     variables: {loadId}
            // })

        
            await data2 ({
                variables: {loadId}
            })
        console.log("data 2 is:", data2)
    }
// dispatch({
//     type: TRUCKER_LOADS,
//     Trucker_Loads: data?.getTruckerLoads
// })
// var sum = 0
// let test = data?.getTruckerLoads.map(load => {
//     sum = sum + 1
//      objName = "obj" + sum
// console.log(load)
// })

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
            <div>
                {getLoadInfo(load._id) ? (<span>{data2}</span>) : ''       }
            
           <p>
               {/* <span>State: {data2.state}</span>                */}
                   
           </p>
           </div> 
        ))}
    </div>
)

}

export default My_Loads;