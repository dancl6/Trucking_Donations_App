import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { GET_LOAD2 } from "../utils/mutations";
import { GET_TRUCKER_LOADS} from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState'
import { TRUCKER_LOADS } from "../utils/actions";
// import GetLoad from "./GetLoad"
// import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const My_Loads = () => {
    const arrayId = []
    const arrayState = []
    const arrayAddress = []
    const arrayZip = []
    
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    console.log("data now is:", data?.getTruckerLoads._id)
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
    // const {loading: loading2, data: data2 } = useQuery(GET_LOAD, {
    //     variables: {loadId},
    // })
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

    // if (data2) {
    //     console.log("data 2 is:::", data2[0])
    // }

    console.log("data for my loads is:", data?.getTruckerLoads[2].zipcode)
return (
    <div>
        {/* {data.getTruckerLoads ?

          (<h1>Add a Workout?</h1>) :
          (<h1>Current Workout</h1>)} */}


        <div>


            {data?.getTruckerLoads.map(item => (

                // return (

                <div>
            <Link to={`/modify_load/${item._id}`}>
            <Button key = {item._id} variant="primary">Update Load</Button>
          </Link>
                <div key = {item._id}>
                  {item.state} {item.currentStatus} {item._id}
                </div>
                </div>
                // )
            ))}

        </div>
        {/* <div>
        {data?.getTruckerLoads[0].state}
        </div> */}
        {/* {Object.keys(data?.getTruckerLoads).map(function(key,index){

        
            return(
            
            <div>
            {data?.getTruckerLoads[index].state}
            {data?.getTruckerLoads[index].zipcode}


            <Link to={`/modify_load/${data?.getTruckerLoads[index]._id}`}>
            <Button variant="primary">Update Load</Button>
          </Link>
          </div>
            )
        })} */}




        {/* <div>{arrayId}</div> */}


    </div>
)

}

export default My_Loads;