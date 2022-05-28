import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/react-hooks';
import Auth from "../../utils/auth";
import {useSelector} from "react-redux"
import { REMOVE_LOAD } from "../../utils/mutations";
import { GET_TRUCKER_LOADS} from "../../utils/queries";
import { useStoreContext } from '../../utils/GlobalState'
import { TRUCKER_LOADS, UPDATE_TRUCKER_LOADS } from "../../utils/actions";
import { UPDATE_LOADS, REMOVE_TRUCKER_LOAD } from '../../utils/actions'
// import GetLoad from "./GetLoad"
// import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
// import  LoadList from "../../pages/LoadList"
// import LoadListRemove from '../LoadListRemove';
const My_Loads_Component = () => {
    // const currentChannel = useSelector(state => state.TruckerLoads)
    // const currentChannelName = currentChannel._id
    const arrayId = []
    const arrayState = []
    const arrayAddress = []
    const arrayZip = []
    const [state, dispatch] = useStoreContext();
    // var [myLoads, setMyLoads] = useState({
    //     [currentChannelName] : true
    // });
    const [ totalLoads, setTotalLoads ] = useState(useQuery(GET_TRUCKER_LOADS))
    const [test, setTest] = useState(true)
    const [reduxState, setReduxState] = useState()
    const [removeLoad, {error2}] = useMutation(REMOVE_LOAD)

    const {loading, data} = useQuery(GET_TRUCKER_LOADS);
    const loads =  data?.loads || []
    console.log("data now is:", data?.getTruckerLoads.loads)
    
    const addToLoads = () => {

    }



    


const handleRemoveLoad = async (loadRemoved) => {
    try {
        // setMyLoads(myLoads.filter(item => item._id !== loadRemoved));
        await removeLoad({
            variables: {loadRemoved}
        })
        if(data) {

            dispatch({
                type: REMOVE_TRUCKER_LOAD,
                _id: loadRemoved
                // loadsStore : data.getTruckerLoads.filter(item => item.id !== loadRemoved  )
                
            })


    }
    } catch (e) {
        console.error(e)
    }
    window.location.reload(false)
}

// useEffect(() => {
//   if (data) {

//       console.log("my loads in effect is :", data.getTruckerLoads)
//     //   console.log("RERENDER MY LOADS: STATE IS", state)
//     dispatch({
//                  type: UPDATE_LOADS,
//                  loadsStore : data.getTruckerLoads

//              })
//     console.log("my state is:", state.TruckerLoads)
//   } 
// //   window.location.reload(false);
// },[data.getTruckerLoads])

useEffect(() => {
    console.log('STATE from Workout useEffect loads store is', data?.getTruckerLoads)   
    // window.location.reload(false); 
}, [data?.getTruckerLoads])



// useEffect(() => {
//     console.log('database is:', data?.getTruckerLoads.length)
// }, [data?.getTruckerLoads.length])

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

    console.log("array id is :", arrayId)
    const loadId = arrayId

const handleGetLoad = async (event) => {



}

    // if (data2) {
    //     console.log("data 2 is:::", data2[0])
    // }

    // console.log("data for my loads is:", data?.getTruckerLoads[2].zipcode)
return (
    <div>

          
            { 
            data?.getTruckerLoads.map(item =>
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
                // myLoads = myLoads.filter(test => {return test._id !== loadRemoved} )
                let test = [1,2,4,6]
                test.filter(test => {
                    return test !== 2;
                  })
                console.log("filter test is:", test)
                // console.log(" my new loads after delete is:", myLoads)
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

export default My_Loads_Component;