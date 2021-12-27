import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_LOAD } from '../utils/mutations';
import {UserForm} from './UserForm'

const Modify_Load = () => {
  const [data, setData ] = useState(null)
  const [updateLoad, { error }] = useMutation(UPDATE_LOAD);
  useEffect(() => {
    const fetchData = async () => {
      setData(await updateLoad())
    }
    fetchData()
  }, [])
  // return(
    // return <UserForm preloadedValues={data}/>
  return data ? <UserForm preloadedValues= {data}/> : <div>Loading...</div>
  // if (data) {return (  (<UserForm preloadedValues = {data} />) ) }else { return (<div>Loading...</div>)}
  // )
}

export default Modify_Load;