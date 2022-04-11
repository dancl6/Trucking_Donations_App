import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
// import { Component } from 'react'
// import Auth from "../utils/auth";
import { useStoreContext } from '../../utils/GlobalState'

import { ADD_LOAD } from "../../utils/mutations";
import { TRUCK_ID_IS } from "../../utils/queries";
import { useForm } from "react-hook-form"
import { onError } from "apollo-link-error"
import { createHttpLink } from "apollo-link-http";
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import Select from 'react-select'
import {ADD_TRUCKER_LOAD } from "../../utils/actions";
// import { useAsyncTask } from 'react-hooks-async'
import { ErrorMessage } from '@hookform/error-message'
// import { QUERY_ME } from "../../utils/queries";
// type FormData = {
//   streetAddress: String;

// }

// function Trucker_Signup() {
const Add_Load = () => {

  const [state, dispatch] = useStoreContext();
  const [formState, setFormState] = useState({streetAddress: '', state: '' , zipcode: '' , donationItem: '', number: '' , trucker: '', currentStatus: '', confirmed: false, dateStart:'', timeStart: '', dateEnd: '', timeEnd: '' });
  const [optionState, setOptionState] = useState({currentStatus: ''})
  const [addLoad, {data:data4, error }] = useMutation(ADD_LOAD);
  const { register, handleSubmit, formState: { errors }
} = useForm();
const [button, setButton] = useState('Open');
const {data} = useQuery(TRUCK_ID_IS);

let test

function setPause () {
  setTimeout(console.log("hi"), 10000)
}


useEffect(() => {
  console.log(`RERENDER ADD LOAD: STATE IS`, state);
}, [state]);

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


// console.log("link", link)





  const onSubmit = async(data2) => {
    console.log(data2.number, formState.streetAddress)


    try {
 console.log("trucking id is this:", data?.trucker_Id.truck,  "button value is:", button)
      await addLoad({
        // variables: { ...data }
        variables: {
          streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: data2.number,  currentStatus: button, trucker: data?.trucker_Id.truck,  rating: data2.rating, confirmed: false, dateStart: data2.dateStart, timeStart: data2.timeStart, dateEnd: data2.dateEnd, timeEnd: data2.timeEnd 
        }
      })
        if (data4){
        dispatch({
          type: ADD_TRUCKER_LOAD,
          newItem: data4.addLoad._id
      })
    
      
        console.log("data4 from add load is:", data4.addLoad._id)   
    }
        // console.log("data4 from add load is:", data4.addLoad._id)        
    } catch (e) {
      console.error(e);
      let test = e
      console.log("testing error is:", e)
    }
        
    window.location.reload(false)
    
  }

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
       await addLoad({
        variables: { ...formState }

      });
      
      // Auth.login(data.token);
    } catch (e) {
      console.error(e);
  
      // {e ? <div>{e}</div> : null}

    }
    console.log(error)
  }
  
  
  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  const handleChange2 = event => {
    const { name, value } = event.target;
    setOptionState({
      ...optionState,
      [name]: value
    });
  };
  // function optionState() {
  //   var options = [],
  //   optionState = this.props.optionState;


  // }
  // console.log(errors, "Errors")
  function loadForm() {

  return (
    <div key = "Parent Div" className="container my-1">
      <Link key = "Parent Link" to="/trucker_login">
        ← Go to Login
      </Link>

      <h2 key = "Parent h2">Add Load</h2>
      {/* <form onSubmit=   {handleSubmit(onSubmit)}> */}
      <form onSubmit = {handleSubmit(onSubmit)}
        
        

        >
        <div className="flex-row space-between my-2">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            placeholder="streetAddress"
            name="streetAddress"
            type="streetAddress"
            id="streetAddress"
            key = "streetAddress"
            // value={formState.streetAddress}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="state">State:</label>
          <input
            placeholder="state"
            name="state"
            type="state"
            id="state"
            key = "state"
            // value={formState.state}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="zipcode">Zipcode:</label>
          <input
            placeholder="zipcode"
            name="zipcode"
            type="zipcode"
            id="zipcode"
            key = "zipcode"
            // value={formState.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="donationItem">Donation Item:</label>
          <input
            placeholder="Donation Item"
            name="donationItem"
            type="donationItem"
            id="donationItem"
            key = "donationItem"
            // value={formState.donationItem}
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <label htmlFor="number">Number:</label>
          <input
          // type = "number" 
          {...register(
                  "number",
                  {       
                    setValueAs: v => parseFloat(v)       
       
                  })} 
 

            onChange={handleChange}
            key = "number"
          />
            {errors.number ? <div>{errors.number.message}</div> : null}
            {test ? <div>{test}</div> : null}
            
        </div>

        <div className="flex-row space-between my-2">
          <label htmlFor="currentStatus">Current Status:</label>

          <DropdownButton title = {button} onSelect = {function (evt) {
            console.log("the new and nice value is:", evt)

             setButton(evt)
          }}
          key = "currentStatus"
          > <MenuItem eventKey = "Open">Open</MenuItem>
              <MenuItem eventKey = "In Progress">In Progress</MenuItem>
              <MenuItem eventKey = "Closed">Closed</MenuItem>
          </DropdownButton>
        </div>

        <div className="flex-row space-between my-2">
        <label htmlFor="dateStart">Start Date for Load Drop Off:</label>
          <input 
          type = "number" 
          {...register(
                  "dateStart",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "dateStart"
          />

            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="timeStart">Start Time for Load Drop Off:</label>
          <input 
          type = "number" 
          {...register(
                  "timeStart",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "timeStart"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="dateEnd">End Date for Load Drop Off:</label>
          <input 
          type = "number" 
          {...register(
                  "dateEnd",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "dateEnd"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
        <label htmlFor="timeEnd">End Time for Load Drop Off:</label>
          <input 
          type = "number" 
          {...register(
                  "timeEnd",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "timeEnd"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        {/* <div className="flex-row space-between my-2">
        <label htmlFor="timeDuration">Time Interval for Drop Off:</label>
          <input 
          // type = "rating" 
          {...register(
                  "timeDuration",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    // min: { value: 1, message: "Rating must not be less than 1"},
                    // max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
            key = "timeDuration"
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div> */}



        <div className="flex-row flex-end">
          <button type="submit" onClick = {() => {
            setPause()
          }}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
      }
    
    return (
      <div>
    {loadForm()}
    </div>
    )
  // }
}

export default Add_Load;