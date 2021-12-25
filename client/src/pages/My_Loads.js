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
    const arrayId = []
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
// const [getLoad2] = useMutation(GET_LOAD2)
    const [state, dispatch] = useStoreContext();
    // const [loadId, setLoadId] = useState('')

    if (data){
        console.log("data hey is:", data.getTruckerLoads[0],'data length is:', data.getTruckerLoads.length)
    for (let i = 0; i < data.getTruckerLoads.length; i ++ ){
        arrayId.push(data.getTruckerLoads[i]._id)
        console.log("pushing is :", data.getTruckerLoads[i]._id)
    }
}
    console.log("array id is :", arrayId)
    const loadId = arrayId
    // const loadId = test

    // console.log("test is now:", test?.[0]._id)
    const {loading: loading2, data: data2 } = useQuery(GET_LOAD, {
        variables: {loadId},
    })
    // useEffect(() => {
    //     if (data2) {
    //         console.log("data2 is:", data2)
    //         dispatchEvent({
    //             type: TRUCKER_LOADS,
    //             loads: data2.load
    //         })
    //     }

    // }, [data2, loading2, dispatch])
const handleGetLoad = async (event) => {
    // loadId = "6142bdb9b88e8e5794462379"

    // setLoadId(event)    
    // const res = await data2({
    //     variables: {loadId}
    // })
    // const loads = res.data;
    // this.setState({
    //     Loads: loads
    // })


}

    if (data2) {
        console.log("data 2 is:::", data2[0])
    }

    console.log("data for my loads is:", data?.getTruckerLoads, "and next is:", data2?.state)
return (
    <div>
        {/* <div>{arrayId}</div> */}
        {arrayId?.map(load => (
            <div>{load}</div>
        ))}
        {data2?.map(load => (
            <div>
            {/* <div>    {data2 ? (<span>{data2}</span>) : ''       }</div> */}
            


           <p>
               {/* <span>State: {data2.state}</span>                */}
                   
           </p>
           </div> 
        ))}
    </div>
)

}

export default My_Loads;