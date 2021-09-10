import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/react-hooks';
// import { Component } from 'react'
// import Auth from "../utils/auth";
import { ADD_LOAD } from "../../utils/mutations";
import { TRUCK_ID_IS } from "../../utils/queries";
import { useForm } from "react-hook-form"
import { onError } from "apollo-link-error"
import { createHttpLink } from "apollo-link-http";
import DropdownButton from 'react-bootstrap/DropdownButton'
import MenuItem from 'react-bootstrap/DropdownItem'
import Select from 'react-select'
// import { useAsyncTask } from 'react-hooks-async'
import { ErrorMessage } from '@hookform/error-message'
// import { QUERY_ME } from "../../utils/queries";
// type FormData = {
//   streetAddress: String;

// }

// function Trucker_Signup() {
const Add_Load = () => {
  var temp
  const [formState, setFormState] = useState({streetAddress: '', state: '' , zipcode: '' , donationItem: '', number: '' , trucker: '', currentStatus: '', confirmed: false, dateStart:'', timeStart: '', timeDuration: '' });
  const [optionState, setOptionState] = useState({currentStatus: ''})
  const [addLoad, { error }] = useMutation(ADD_LOAD);
  const { register, handleSubmit, formState: { errors }
} = useForm();
const {data} = useQuery(TRUCK_ID_IS);

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

  // const cancelForm = async event => {
  //   document.getElementById("trucker").reset();
  // }



  const onSubmit = async(data2) => {
    console.log(data2.number, formState.streetAddress)
    // async(data) => {
      // const response =     

    try {
 console.log("trucking id is this:", data?.trucker_Id.truck, "current status temp is:", temp)
      await addLoad({
        // variables: { ...data }
        variables: {
          streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: data2.number,  currentStatus: temp, trucker: data?.trucker_Id.truck,  rating: data2.rating, confirmed: false, dateStart: data2.dateStart, timeStart: data2.timeStart, timeDuration: data2.timeDuration
        }
      })
    } catch (e) {
      console.error(e);
      let test = e
      console.log("testing error is:", error)
    }
        
      // const data = await response.json();
      // console.log(data, "server data")
    // })
    
  }

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
       await addLoad({
        variables: { ...formState }
        // variables: {
        //   streetAddress: formState.streetAddress, state: formState.state, zipcode: formState.zipcode, donationItem: formState.donationItem, number: formState.number, trucker: formState.trucker, currentStatus: formState.currentStatus, dock: formState.dock
        // }
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
  // class App extends React.component {
    // constructor() {
  //   super();
  //   this.state = {selectValue: ''}
    
  //  var callThis = (e) => {
  //     console.log(this.selectVal.value)
  //   }
    // console.log("query data is:", data?.trucker_Id.truck )

    // render(){
  return (
    <div className="container my-1">
      <Link to="/trucker_login">
        ← Go to Login
      </Link>

      <h2>Add Load</h2>
      {/* <form onSubmit=   {handleSubmit(onSubmit)}> */}
      <form onSubmit = {handleSubmit(onSubmit)}
        
        
        // async(formData) => {
        
        //      await addLoad({
        //     variables: { ...formData }
        //     // variables: {
        //     //   streetAddress: formData.streetAddress, state: formData.state, zipcode: formData.zipcode, donationItem: formData.donationItem, number: formData.number, trucker: formData.trucker, currentStatus: formData.currentStatus, dock: formData.dock
        //     // }
        //   });
        //   // const data = await response.json();
        //   // console.log(data, "server data")
        // })}
        >
        <div className="flex-row space-between my-2">
          <label htmlFor="streetAddress">Street Address:</label>
          <input
            placeholder="streetAddress"
            name="streetAddress"
            type="streetAddress"
            id="streetAddress"
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
            // placeholder="number"
            // name="number"
            // type="number"
            // id="number"
            // ref={
            //   register({
            //     validate: v =>
            //     typeof v !== "number" ? "Invalid amount" : v % 2 !==0 ? "Only even amounts are allowed!" : undefined,
            //   })
            // }

            onChange={handleChange}
          />
            {errors.number ? <div>{errors.number.message}</div> : null}
            {test ? <div>{test}</div> : null}

        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="trucker">Trucker:</label>
          <input
            placeholder="trucker"
            name="trucker"
            type="trucker"
            id="trucker"
            // value={formState.trucker}
            onChange={handleChange}
          />
        </div> */}
        <div className="flex-row space-between my-2">
          <label htmlFor="currentStatus">Current Status:</label>
          {/* <select
            ref = {(input) => this.selectVal = input} 
            placeholder="currentStatus"
            name="currentStatus"
            type="currentStatus"
            id="currentStatus"
            // value={formState.currentStatus}
            onChange={optionState}
            // value = {optionState}
          >
          <option value="Open">Open</option>
          <option value= "In Progress">In Progress</option>
          <option value= "Closed">Closed</option>
          </select>
          <input type = "button" value = "click" onClick = {this.callThis}/> */}

          <DropdownButton  onSelect = {function (evt) {
            console.log("the new and nice value is:", evt)
             temp = evt
          }}> <MenuItem eventKey = "Open">Open</MenuItem>
              <MenuItem eventKey = "In Progress">In Progress</MenuItem>
              <MenuItem eventKey = "Closed">Closed</MenuItem>
          </DropdownButton>
        </div>

        {/* <div className="flex-row space-between my-2">
          <label htmlFor="dock">Dock:</label>
          <input
            placeholder="dock"
            name="dock"
            type="dock"
            id="dock"
            // value={formState.dock}
            onChange={handleChange}
          />
        </div> */}

        {/* <div className="flex-row space-between my-2">
        <label htmlFor="rating">Rating:</label>
          <input 
          type = "number" 
          {...register(
                  "rating",
                  {       
                    setValueAs: v => parseFloat(v)   ,
                    min: { value: 1, message: "Rating must not be less than 1"},
                    max: { value: 5, message: "Rating must not be greater than 5"},    
       
                  })} 


            onChange={handleChange}
          />


            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div> */}
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
            // placeholder="number"
            // name="number"
            // type="number"
            // id="number"
            // ref={
            //   register({
            //     validate: v =>
            //     typeof v !== "number" ? "Invalid amount" : v % 2 !==0 ? "Only even amounts are allowed!" : undefined,
            //   })
            // }

            onChange={handleChange}
          />

            {/* <ErrorMessage className = "Error"
              errors={errors}
              name="rating"
              render={({ message }) => <p>{message}</p>}
            /> */}
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
            // placeholder="number"
            // name="number"
            // type="number"
            // id="number"
            // ref={
            //   register({
            //     validate: v =>
            //     typeof v !== "number" ? "Invalid amount" : v % 2 !==0 ? "Only even amounts are allowed!" : undefined,
            //   })
            // }

            onChange={handleChange}
          />

            {/* <ErrorMessage className = "Error"
              errors={errors}
              name="rating"
              render={({ message }) => <p>{message}</p>}
            /> */}
            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        <div className="flex-row space-between my-2">
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
            // placeholder="number"
            // name="number"
            // type="number"
            // id="number"
            // ref={
            //   register({
            //     validate: v =>
            //     typeof v !== "number" ? "Invalid amount" : v % 2 !==0 ? "Only even amounts are allowed!" : undefined,
            //   })
            // }

            onChange={handleChange}
          />

            {/* <ErrorMessage className = "Error"
              errors={errors}
              name="rating"
              render={({ message }) => <p>{message}</p>}
            /> */}
            {errors.rating ? <div>{errors.rating.message}</div> : null}
        </div>
        {/* <div className="flex-row space-between my-2">
          <label htmlFor="confirmed">Confirmed?:</label>
          <input
            placeholder=""
            name="confirmed"
            type="boolean"
            id="confirmed"
            // value={formState.trucker}
            onChange={handleChange}
          />
        </div> */}
        <div className="flex-row flex-end">
          <button type="submit">
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