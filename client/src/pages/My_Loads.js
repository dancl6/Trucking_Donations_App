import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Auth from "../utils/auth";
import { REMOVE_LOAD } from "../utils/mutations";
import { GET_TRUCKER_LOADS} from "../utils/queries";
import { useStoreContext } from '../utils/GlobalState'
import { TRUCKER_LOADS, UPDATE_TRUCKER_LOADS } from "../utils/actions";
import { UPDATE_LOADS } from '../utils/actions'
// import GetLoad from "./GetLoad"
// import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'

const My_Loads = () => {
    const arrayId = []
    const arrayState = []
    const arrayAddress = []
    const arrayZip = []
    const [state, dispatch] = useStoreContext();
    var [myLoads, setMyLoads] = useState(state.TruckerLoads);
    const [test, setTest] = useState(true)
    const [removeLoad, {error2}] = useMutation(REMOVE_LOAD)
    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    console.log("data now is:", data?.getTruckerLoads.loads)

    const addToLoads = () => {
        // if(data) {
        //     dispatch({
        //         type: UPDATE_LOADS,
        //         loadsStore : data.getTruckerLoads

        //     })
        // }
    }



    
// const [getLoad2] = useMutation(GET_LOAD2)

    // const [loadId, setLoadId] = useState('')

const handleRemoveLoad = async (loadRemoved) => {
    try {
        await removeLoad({
            variables: {loadRemoved}
        })

    } catch (e) {
        console.error(e)
    }
}
// const handleShow = () => setShow(true);
// if (data) {
    // setMyLoads (
    //     state.TruckerLoads
    // )

// }
// useEffect(() => {
//   if (data) {
//       console.log("my loads in effect is :", data, myLoads)
//     //   console.log("RERENDER MY LOADS: STATE IS", state)
//       dispatch({
//         type: UPDATE_TRUCKER_LOADS,
//         TruckerLoads: data.getTruckerLoads
//     })
 
//   } else {
//   } 
// }, [myLoads])
console.log("after is:", test)
// {setMyLoads(myLoads = data)}
    if (data){
        console.log("data hey is:", data.getTruckerLoads[0],'data length is:', data.getTruckerLoads.length)
    for (let i = 0; i < data.getTruckerLoads.length; i ++ ){
        if (data.getTruckerLoads[i] != null) {
        arrayId.push(data.getTruckerLoads[i]._id)
        
        console.log("pushing is :", data.getTruckerLoads[i]._id)
        } else {}
    }
}

console.log("trucker loads from store is:", state)
console.log("my loads with useState is:", myLoads)
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

    // console.log("data for my loads is:", data?.getTruckerLoads[2].zipcode)
return (
    <div>
        {/* {data.getTruckerLoads ?

          (<h1>Add a Workout?</h1>) :
          (<h1>Current Workout</h1>)} */}


        {/* <div> */}


          {/* {data? (<div></div>) : null} */}
          
            {state.TruckerLoads?.map(item =>
            item  ?
            (

            <div key = {`ParentDiv1_${item._id}`}>
       
                <div key = {`ParentDiv2_${item._id}`}>
            <Link to={`/modify_load/${item._id}`} key = "link">
            <Button key = {item._id} variant="primary">Update Load</Button>
          </Link>
          <div >
            <Button   onClick={() => {
                let loadRemoved = item._id
                handleRemoveLoad(loadRemoved)
            }
              }  key = {item._id} variant="primary">Remove Load</Button>
          </div>
                <div key = {item._id}>
                  {item.state} {item.currentStatus} {item._id}
                </div>
                </div>
                </div>
       
            ): null)}

        {/* </div> */}



    </div>
)

}

export default My_Loads;