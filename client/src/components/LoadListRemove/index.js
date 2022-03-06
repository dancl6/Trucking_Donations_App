import React, { useEffect } from "react";
import Auth from '../../utils/auth'
import { REMOVE_LOAD } from '../../utils/mutations'
import { useMutation } from '@apollo/react-hooks';
import { useStoreContext } from '../../utils/GlobalState';
import { REMOVE_FROM_CURRENT_WORKOUT } from '../../utils/actions';
import Button from 'react-bootstrap/Button';
import { UPDATE_LOADS, REMOVE_TRUCKER_LOAD } from '../utils/actions'

function LoadListRemove() {
  const [state, dispatch] = useStoreContext();
  const [removeLoad] = useMutation(REMOVE_LOAD);
  const handleDeleteLoad = async (loadRemoved) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      await removeLoad({
        variables: { loadRemoved}
      });
      dispatch({
        type: REMOVE_TRUCKER_LOAD,
        _id : loadRemoved
      });
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    console.log(`RERENDER: STATE IS`, state.TruckerLoads);
  }, [state.TruckerLoads]);

  return (
    <div className="my-2">
      <div className="flex-row">
        {state.TruckerLoads.map(load => (
            
          <p
            className="workout-text"
            key={load._id}
          >
            <span style={{ fontWeight: "bolder" }}>{load._id} -</span>
            {load.state ? (<span > State: {load.state}</span>) : ''}
            {load.zipcode ? (<span> Zipcode: {load.zipcode}sec</span>) : ''}


            <Button
            // onClick={() => {
            //     let loadRemoved = load._id}}
              variant="danger"
              className="float-right"
              onClick={() => {
                let loadRemoved = load._id
                handleDeleteLoad(loadRemoved)
              }}
            >X</Button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default LoadListRemove;