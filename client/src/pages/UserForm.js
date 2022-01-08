import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useForm } from "react-hook-form"
import { onError } from "apollo-link-error"
import { UPDATE_LOAD } from '../utils/mutations';
import { TRUCK_ID_IS, GET_LOAD } from '../utils/queries';
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import { useParams } from 'react-router-dom'
import { createHttpLink } from "apollo-link-http";

export function  UserForm({preloadedValues}) {
// const preloadedValues = {
    const { register, handleSubmit, formState: { errors }
} = useForm({
  defaultValues: preloadedValues
});
// }
// const QueryString = window.location.search;
// console.log("Query string is:", QueryString)
// const id = QueryString
const [button, setButton] = useState('Select Status');
const { id } = useParams();
const [updateLoad, {error}] = useMutation(UPDATE_LOAD)
const { loading: loadingLoad, data: loadData } = useQuery(GET_LOAD, {
  variables: { _id: id }
});
console.log("data from get load is this:", loadData.getLoad._id)
const {data} = useQuery(TRUCK_ID_IS);
const [formState, setFormState] = useState({streetAddress: '', state: '' , zipcode: '' , donationItem: '', number: '' , trucker: '', currentStatus: '', confirmed: false, dateStart:'', timeStart: '', timeDuration: '' });

const onSubmit = async(data2) => {
  console.log("data 2 is on submit",data2, formState.streetAddress)
console.log("testing one two", data?.trucker_Id.truck)

  try {
//  console.log("trucking id is this:", data?.trucker_Id.truck,  "button value is:", button)
    await updateLoad({
      // variables: { ...data }
      variables: {
       LoadId: id, streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: data2.number,  currentStatus: button, trucker: data?.trucker_Id.truck,  rating: data2.rating, confirmed: formState.confirmed, dateStart: data2.dateStart, timeStart: data2.timeStart, timeDuration: data2.timeDuration
      }
    })
  } catch (e) {
    console.error(e);
    // let test = e
    console.log("testing error user form is:", error)
  }
      

  
}

// const [formState, setFormState] = useState({LoadId: "607f8255c8bb1c7408eba11e",streetAddress: "", state: "WHY NOW" , zipcode: null , donationItem: "", number: 45 , dock:"607f8204c8bb1c7408eba11d", trucker: "607f81e9c8bb1c7408eba11c", currentStatus: "", confirmed: true, dateStart:76, timeStart: 86, timeDuration: 35 });
const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };

  let test

  const requestLink = createHttpLink({
    uri: 'http//api.githunt.com/graphql',
  })
  
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations, path }) =>
      
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
  
      );
      let test = graphQLErrors
  
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  
  const link = errorLink.concat(requestLink)
  
  
  console.log("link", link)
  

  


  
  return (
    <div className="container my-1">
      <Link to="/trucker_login">
        ← Go to Login
      </Link>

      <h2>Modify Load</h2>

      <form onSubmit = {handleSubmit(onSubmit)}
        
        

        >
        <div className="flex-row space-between my-2">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            ref = {register}
            placeholder="streetAddress"
            name="streetAddress"
            type="streetAddress"
            {...register("streetAddress", {required: true})}
            id="streetAddress"
            // value={formState.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="state">State:</label>
          <input
            ref = {register}
            placeholder="state"
            name="state"
            type="state"
            {...register("state", {required: true})}
            id="state"
            // value={formState.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            ref = {register}
            placeholder="zipcode"
            name="zipcode"
            type="zipcode"
            {...register("zipcode", {required: true})}
            id="zipcode"
            // value={formState.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="donationItem">Donation Item:</label>
          <input
            ref = {register}
            placeholder="Donation Item"
            name="donationItem"
            type="donationItem"
            {...register("donationItem", {required: true})}
            id="donationItem"
            // value={formState.donationItem}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="number">Number:</label>
          <input
            ref = {register}
          type = "number" 
          {...register(
                  "number",
                  {required: true},
                  {       
                    setValueAs: v => parseFloat(v)       
       
                  })} 
 

            onChange={handleChange}
            name = "number"
          />
            {errors.number ? <div>{errors.number.message}</div> : null}
            {test ? <div>{test}</div> : null}

        </div>

        <div>
          <input title = {button} onSelect = {function (evt) {
            setButton(evt)
          }}
          ref = {register}
          {...register("currentStatus", {required: true})}
          name = "currentStatus"
          type = "currentStatus"
          >
          </input>
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="currentStatus">Current Status:</label>
          
          <DropdownButton title = {button} onSelect = {function (evt) {
            console.log("the new and nice value is:", evt)

             setButton(evt)
          }}
          ref = {register}
          {...register("currentStatus", {required: true})}
          name = "currentStatus"
          type = "currentStatus"
          > <MenuItem eventKey = "Open">Open</MenuItem>
              <MenuItem eventKey = "In Progress">In Progress</MenuItem>
              <MenuItem eventKey = "Closed">Closed</MenuItem>
          </DropdownButton>
        </div>

        <div className="flex-row space-between my-2">
        <label htmlFor="dateStart">Start Date for Load Drop Off:</label>
          <input 
            ref = {register}
          type = "dateStart" 
          {...register(
                  "dateStart",
                  {required: true},

                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            name = "dateStart"
          />

            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="timeStart">Start Time for Load Drop Off:</label>
          <input 
          type = "timeStart" 
          ref = {register}
          {...register(
                  "timeStart",
                  {required: true},
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            name = "timeStart"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="timeDuration">Time Interval for Drop Off:</label>
          <input 
          type = "timeDuration" 
          ref = {register}
          {...register(
                  "timeDuration",
                  {required: true},
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            name = "timeDuration"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>

        <div className="flex-row flex-end">
          <button type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>

  )

}

// export default UserForm;