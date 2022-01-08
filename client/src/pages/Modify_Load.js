import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { UPDATE_LOAD } from '../utils/mutations';
import { GET_LOAD } from '../utils/queries'
import {UserForm} from './UserForm'
// import { useForm } from "react-router-form"
import { useParams } from 'react-router-dom'

const Modify_Load = () => {
  const [data2, setData ] = useState(null)
  const { id } = useParams();
  // const [data: data3, loading] = useQuery(GET_LOAD)
  const { loading: loadingLoad, data: loadData2 } = useQuery(GET_LOAD, {
    variables: { _id: id }
  });
  console.log("load for this now is:", loadData2?.getLoad)
  const [updateLoad, { error }] = useMutation(UPDATE_LOAD);
  useEffect(() => {
    const fetchData = async () => {
      setData(loadData2?.getLoad)
      // setData(loadData.getLoad._id/)
    }
    fetchData()
  }, [])
  // return(
    // return <UserForm preloadedValues={data}/>
  return loadData2 ? <UserForm preloadedValues= {loadData2?.getLoad}/> : <div>Loading... </div>
  // if (data) {return (  (<UserForm preloadedValues = {data} />) ) }else { return (<div>Loading...</div>)}
  // )
}

export default Modify_Load;