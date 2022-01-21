import React, { useState, useEffect } from "react";
import  { QUERY_ME, LOAD_QUERY, GET_TRUCKER_LOADS }  from "../utils/queries";
import  { REMOVE_LOAD }  from "../utils/mutations";
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useStoreContext } from '../utils/GlobalState'
import { render } from "react-dom";
import { TRUCKER_LOADS, UPDATE_TRUCKER_LOADS } from "../utils/actions";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'


function LoadList() {
    let arrayId = []
    const [state, dispatch] = useStoreContext();
    const {loading, data:data3} = useQuery(GET_TRUCKER_LOADS);
    const [removeLoad, {error2}] = useMutation(REMOVE_LOAD)
    console.log("data hey now is:", data3?.getTruckerLoads[0],'data length now is:', data3?.getTruckerLoads.length)
    for (let i = 0; i < data3.getTruckerLoads.length; i ++ ){
        if (data3.getTruckerLoads[i] != null) {
        arrayId.push(data3.getTruckerLoads[i]._id)
        
        console.log("pushing is :", data3.getTruckerLoads[i]._id)
        } else {}
    }

    const handleRemoveLoad = async (loadRemoved) => {
        try {
            await removeLoad({
                variables: {loadRemoved}
            })
    
        } catch (e) {
            console.error(e)
        }
    }

    if (data3){

      // console.log("my loads in effect is :", data, myLoads)
    //   console.log("RERENDER MY LOADS: STATE IS", state)
      dispatch({
        type: UPDATE_TRUCKER_LOADS,
        TruckerLoads: data3.getTruckerLoads
    })
    console.log("state in new load list is:", state)

  } else {
  } 
  


render(
    <div>
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
    </div>
)
}

export default LoadList